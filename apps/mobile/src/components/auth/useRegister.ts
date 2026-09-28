import { saveTokens } from '@/lib/auth/auth-storage';
import { ApiError, useAuthMobileRegister } from '@app/api-client';
import { getErrorMessage } from '@app/utils';
import { type RegisterFormValues } from '@app/validation';
import { toast } from 'sonner-native';

export function useRegister() {
  const { mutate: register, isPending } = useAuthMobileRegister();

  const onSubmit = (data: RegisterFormValues) => {
    register(
      {
        data: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: async (response) => {
          await saveTokens(response.accessToken, response.refreshToken);
          toast.success('Account created');
        },
        onError: (error) => {
          //TODO: change logic to use getErrorMessage
          if (error instanceof ApiError) {
            toast.error(getErrorMessage(error.status));
            return;
          }
          toast.error('Failed to create account');
        },
      },
    );
  };

  return {
    onSubmit,
    isPending,
  };
}
