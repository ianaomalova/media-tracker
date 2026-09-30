import { getApiErrorMessage, useAuthMobileRegister } from '@app/api-client';
import { type RegisterFormValues } from '@app/validation';
import { toast } from 'sonner-native';
import { useAuthStore } from '../model/auth-store';

export function useRegister() {
  const { mutate: register, isPending } = useAuthMobileRegister();
  const signIn = useAuthStore((state) => state.signIn);

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
          await signIn(response);
          toast.success('Account created');
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
