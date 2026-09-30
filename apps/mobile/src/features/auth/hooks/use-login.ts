import { getApiErrorMessage, useAuthMobileLogin } from '@app/api-client';
import type { LoginFormValues } from '@app/validation';
import { toast } from 'sonner-native';
import { useAuthStore } from '../model/auth-store';

export function useLogin() {
  const { mutate: login, isPending } = useAuthMobileLogin();
  const signIn = useAuthStore((state) => state.signIn);

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
          await signIn(response);
          toast.success('Logged in');
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      },
    );
  };

  return {
    onSubmit,
    isPending,
  };
}
