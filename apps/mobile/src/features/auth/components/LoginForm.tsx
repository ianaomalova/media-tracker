import { StyleSheet, Text } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@app/validation';
import { Link } from 'expo-router';
import { fontSize, semanticColors } from '@app/design-tokens';
import { useLogin } from '../hooks/use-login';
import AuthScreenLayout from './AuthScreenLayout';
import { Button, Input } from '@/shared/ui';
import { routes } from '@/shared/configs';

export default function LoginForm() {
  const { onSubmit, isPending } = useLogin();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <AuthScreenLayout type="login">
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            label="Email"
            placeholder="Enter your email"
            icon={Mail}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            icon={Lock}
            secureTextEntry

            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Link href="/" style={styles.forgotPasswordLink}>
        Forgot password?
      </Link>

      <Button
        variant="primary"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        {isPending ? 'Logging in…' : 'Login'}
      </Button>

      <Text style={styles.loginLinkText}>
        Don&apos;t have an account?{'  '}
        <Link href={routes.REGISTER} style={styles.loginLink}>
          Sign up
        </Link>
      </Text>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 10,

    fontSize: fontSize.sm,
    color: '#2EA8FF',
  },

  loginLinkText: {
    marginTop: 40,

    fontSize: fontSize.sm,
    color: semanticColors.text['little-muted'],
    textAlign: 'center',
  },

  loginLink: {
    color: '#2EA8FF',
    fontWeight: '600',
  },

  button: {
    borderRadius: 12,
    alignSelf: 'stretch',
    marginTop: 24,
  },
});
