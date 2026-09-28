import { View, StyleSheet, Text } from 'react-native';
import Input from '../ui/Input';
import { LinearGradient } from 'expo-linear-gradient';
import { PROJECT_NAME } from '@app/constants';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import Button from '../ui/Button';
import { Mail, Lock } from 'lucide-react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema, type RegisterFormValues } from '@app/validation';
import { useAuthMobileRegister } from '@app/api-client';
import { saveTokens } from '@/lib/auth/auth-storage';

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
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  const { mutate: register, isError, isPending } = useAuthMobileRegister();

  return (
    <View>
      <LinearGradient
        colors={['#B65CFF', '#6824B8', '#1D0A35', '#000000']}
        locations={[0, 0.18, 0.42, 0.65]}
        style={styles.gradient}
      />
      <Image
        source={require('@/assets/images/project-images/auth-media.png')}
        style={styles.heroImage}
        contentFit="contain"
      />
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.title}>{PROJECT_NAME}</Text>
          <Text style={styles.subtitle}>Create an account</Text>
          <Text style={styles.description}>
            Create an account to start tracking your favorite movies, series, games and books
          </Text>
        </View>
        <View style={styles.inputs}>
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
        </View>
        <Button
          variant="primary"
          style={{
            borderRadius: 12,
            alignSelf: 'stretch',
            marginHorizontal: 12,
            marginTop: 16,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          Sign Up
        </Button>
        <Text style={styles.loginLinkText}>
          Already have an account?{'  '}
          <Link href="/login" style={styles.loginLink}>
            Log in
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  header: {
    marginBottom: 20,
  },

  heroImage: {
    position: 'absolute',

    top: 60,
    left: 0,
    right: 0,

    width: '100%',
    height: 130,
  },

  gradient: {
    ...StyleSheet.absoluteFill,
  },

  form: {
    marginTop: 190,
    gap: 16,
  },

  inputs: {
    gap: 16,
    marginHorizontal: 10,
  },

  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },

  subtitle: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 10,
  },

  description: {
    fontSize: 14,
    color: semanticColors.text['little-muted'],
    textAlign: 'center',
  },

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
});
