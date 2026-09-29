import nock from 'nock';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import type { MobileAuthResponse } from '../generated/model';
import type {
  axiosInstance as AxiosInstance,
  configureApiClient as ConfigureApiClient,
} from './axios-instance';

const BASE_URL = 'http://api.test';

let axiosInstance: typeof AxiosInstance;
let configureApiClient: typeof ConfigureApiClient;

let accessToken: string | null;
let refreshToken: string | null;

const onTokensRefreshed = vi.fn(async (tokens: MobileAuthResponse) => {
  accessToken = tokens.accessToken;
  refreshToken = tokens.refreshToken;
});

const onSessionExpired = vi.fn(async () => {});

function refreshResponse() {
  return {
    accessToken: 'fresh-access',
    refreshToken: 'fresh-refresh',
    user: { id: 'u1', email: 'test@example.com' },
  };
}

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
});

beforeEach(async () => {
  // Провайдеры и refreshPromise живут в области видимости модуля, поэтому
  // без сброса состояние протекает между тестами.
  vi.resetModules();
  ({ axiosInstance, configureApiClient } = await import('./axios-instance'));

  vi.clearAllMocks();
  accessToken = 'stale-access';
  refreshToken = 'valid-refresh';

  configureApiClient({
    baseURL: BASE_URL,
    getAccessToken: () => accessToken,
    getRefreshToken: () => refreshToken,
    onTokensRefreshed,
    onSessionExpired,
  });
});

afterEach(() => {
  nock.cleanAll();
});

describe('подстановка access-токена', () => {
  it('читает токен на каждый запрос, а не кеширует его при конфигурации', async () => {
    nock(BASE_URL).get('/users/me').matchHeader('authorization', 'Bearer stale-access').reply(200, {});
    await axiosInstance.get('/users/me');

    accessToken = 'another-access';
    nock(BASE_URL)
      .get('/users/me')
      .matchHeader('authorization', 'Bearer another-access')
      .reply(200, {});
    await axiosInstance.get('/users/me');

    expect(nock.isDone()).toBe(true);
  });

  it('не ставит заголовок, если токена нет', async () => {
    accessToken = null;
    nock(BASE_URL, { badheaders: ['authorization'] }).get('/titles').reply(200, []);

    await expect(axiosInstance.get('/titles')).resolves.toMatchObject({ status: 200 });
  });
});

describe('обновление токена по 401', () => {
  it('обновляет токен, сохраняет оба и повторяет исходный запрос уже со свежим', async () => {
    nock(BASE_URL).get('/users/me').matchHeader('authorization', 'Bearer stale-access').reply(401);
    nock(BASE_URL)
      .post('/auth/mobile/refresh', { refreshToken: 'valid-refresh' })
      .reply(200, refreshResponse());
    nock(BASE_URL)
      .get('/users/me')
      .matchHeader('authorization', 'Bearer fresh-access')
      .reply(200, { id: 'u1' });

    const response = await axiosInstance.get('/users/me');

    expect(response.data).toEqual({ id: 'u1' });
    expect(onTokensRefreshed).toHaveBeenCalledOnce();
    expect(onTokensRefreshed).toHaveBeenCalledWith(
      expect.objectContaining({ accessToken: 'fresh-access', refreshToken: 'fresh-refresh' }),
    );
    expect(onSessionExpired).not.toHaveBeenCalled();
    expect(nock.isDone()).toBe(true);
  });

  it('делает ровно один refresh на несколько параллельных 401', async () => {
    nock(BASE_URL).get('/users/me').reply(401);
    nock(BASE_URL).get('/library').reply(401);
    const refresh = nock(BASE_URL).post('/auth/mobile/refresh').once().reply(200, refreshResponse());
    nock(BASE_URL)
      .get('/users/me')
      .matchHeader('authorization', 'Bearer fresh-access')
      .reply(200, { id: 'u1' });
    nock(BASE_URL)
      .get('/library')
      .matchHeader('authorization', 'Bearer fresh-access')
      .reply(200, []);

    const [me, library] = await Promise.all([
      axiosInstance.get('/users/me'),
      axiosInstance.get('/library'),
    ]);

    expect(me.data).toEqual({ id: 'u1' });
    expect(library.data).toEqual([]);
    expect(refresh.isDone()).toBe(true);
    expect(onTokensRefreshed).toHaveBeenCalledOnce();
  });

  // Моки отвечают многократно: без флага _retried интерсептор ушёл бы
  // в цикл «401 → refresh → 401», и обновление случилось бы больше одного раза.
  it('обновляет токен один раз и сдаётся, если 401 приходит и на свежем', async () => {
    nock(BASE_URL).get('/users/me').times(5).reply(401);
    nock(BASE_URL).post('/auth/mobile/refresh').times(5).reply(200, refreshResponse());

    await expect(axiosInstance.get('/users/me')).rejects.toMatchObject({
      response: { status: 401 },
    });

    expect(onTokensRefreshed).toHaveBeenCalledOnce();
  }, 2000);

  it('пропускает ошибки, отличные от 401, не трогая токены', async () => {
    nock(BASE_URL).get('/users/me').reply(500, { message: 'boom' });
    const refresh = nock(BASE_URL).post('/auth/mobile/refresh').reply(200, refreshResponse());

    await expect(axiosInstance.get('/users/me')).rejects.toMatchObject({
      response: { status: 500 },
    });

    expect(refresh.isDone()).toBe(false);
    expect(onTokensRefreshed).not.toHaveBeenCalled();
    expect(onSessionExpired).not.toHaveBeenCalled();
  });
});

describe('мёртвая сессия', () => {
  // Таймаут ловит дедлок: при обновлении через axiosInstance промис не резолвился никогда.
  it('зовёт onSessionExpired и прокидывает исходную ошибку, если refresh отвечает 401', async () => {
    nock(BASE_URL).get('/users/me').reply(401);
    nock(BASE_URL).post('/auth/mobile/refresh').reply(401);

    await expect(axiosInstance.get('/users/me')).rejects.toMatchObject({
      response: { status: 401 },
    });

    expect(onSessionExpired).toHaveBeenCalledOnce();
    expect(onTokensRefreshed).not.toHaveBeenCalled();
  }, 2000);

  it('не ходит за refresh, если refresh-токена нет', async () => {
    refreshToken = null;
    nock(BASE_URL).get('/users/me').reply(401);
    const refresh = nock(BASE_URL).post('/auth/mobile/refresh').reply(200, refreshResponse());

    await expect(axiosInstance.get('/users/me')).rejects.toMatchObject({
      response: { status: 401 },
    });

    expect(refresh.isDone()).toBe(false);
    expect(onSessionExpired).toHaveBeenCalledOnce();
  });

  it('после провалившегося refresh следующий запрос пробует обновление заново', async () => {
    nock(BASE_URL).get('/users/me').reply(401);
    nock(BASE_URL).post('/auth/mobile/refresh').reply(401);

    await expect(axiosInstance.get('/users/me')).rejects.toThrow();

    nock(BASE_URL).get('/users/me').reply(401);
    const secondRefresh = nock(BASE_URL).post('/auth/mobile/refresh').reply(200, refreshResponse());
    nock(BASE_URL).get('/users/me').reply(200, { id: 'u1' });

    const response = await axiosInstance.get('/users/me');

    expect(response.data).toEqual({ id: 'u1' });
    expect(secondRefresh.isDone()).toBe(true);
  }, 2000);
});

describe('эндпоинты авторизации', () => {
  it('не пытается обновить токен при 401 на логине', async () => {
    nock(BASE_URL).post('/auth/mobile/login').reply(401, { message: 'Invalid credentials' });
    const refresh = nock(BASE_URL).post('/auth/mobile/refresh').reply(200, refreshResponse());

    await expect(
      axiosInstance.post('/auth/mobile/login', { email: 'a@b.c', password: 'wrong' }),
    ).rejects.toMatchObject({ response: { status: 401 } });

    expect(refresh.isDone()).toBe(false);
    expect(onSessionExpired).not.toHaveBeenCalled();
  });

  it('не уходит в рекурсию, если logout отвечает 401', async () => {
    nock(BASE_URL).post('/auth/mobile/logout').reply(401);
    const refresh = nock(BASE_URL).post('/auth/mobile/refresh').reply(200, refreshResponse());

    await expect(
      axiosInstance.post('/auth/mobile/logout', { refreshToken: 'valid-refresh' }),
    ).rejects.toMatchObject({ response: { status: 401 } });

    expect(refresh.isDone()).toBe(false);
  }, 2000);
});
