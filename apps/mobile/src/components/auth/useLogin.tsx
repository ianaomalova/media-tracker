import { saveTokens } from '@/lib/auth/auth-storage';
import { ApiError, useAuthMobileLogin } from '@app/api-client';
import { getErrorMessage } from '@app/utils';
import type { LoginFormValues } from '@app/validation';
import { toast } from 'sonner-native';

export function useLogin() {
  const { mutate: login, isPending } = useAuthMobileLogin();

  const onSubmit = (data: LoginFormValues) => {
    login(
      {
        data: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: async (response) => {
          await saveTokens(response.accessToken, response.refreshToken);
          toast.success('Logged in');
        },
        onError: (error) => {
          //TODO: change logic to use getErrorMessage
          if (error instanceof ApiError) {
            toast.error(getErrorMessage(error.status));
            return;
          }
          toast.error('Failed to login');
        },
      },
    );
  };

  return {
    onSubmit,
    isPending,
  };
}
