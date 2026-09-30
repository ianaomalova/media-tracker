import { StyleSheet, Text } from 'react-native';
import Input from '../ui/Input';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import Button from '../ui/Button';
import { Mail, Lock } from 'lucide-react-native';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useRegister } from './useRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormValues } from '@app/validation';
import AuthScreenLayout from './AuthScreenLayout';
import { pages } from '@/configs/page.config';

export default function RegisterForm() {
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { onSubmit, isPending } = useRegister();

  return (
    <AuthScreenLayout type="register">
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={Lock}
            secureTextEntry

            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
      <Button
        variant="primary"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        {isPending ? 'Creating account…' : 'Sign Up'}
      </Button>
      <Text style={styles.loginLinkText}>
        Already have an account?{'  '}
        <Link href={pages.LOGIN} style={styles.loginLink}>
          Log in
        </Link>
      </Text>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  loginLinkText: {
    fontSize: fontSize.sm,
    color: semanticColors.text['little-muted'],
    textAlign: 'center',
    marginTop: 26,
  },

  loginLink: {
    fontSize: fontSize.sm,
    color: '#B65CFF',
    textAlign: 'center',
    fontWeight: fontWeight.bold,
  },

  button: {
    borderRadius: 12,
    alignSelf: 'stretch',
    marginTop: 16,
  },
});
