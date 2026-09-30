import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Text } from 'react-native';
import { PROJECT_NAME } from '@app/constants';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';

interface Props {
  children: ReactNode;
  type: 'login' | 'register';
}

export default function AuthScreenLayout({ children, type }: Props) {
  const isLogin = type === 'login';
  return (
    <View>
      <LinearGradient
        colors={
          isLogin
            ? ['#18B8F2', '#0877D1', '#082B72', '#06122F', '#000000']
            : ['#B65CFF', '#6824B8', '#1D0A35', '#000000']
        }
        locations={isLogin ? [0, 0.16, 0.32, 0.48, 0.68] : [0, 0.18, 0.42, 0.65]}
        style={styles.gradient}
      />
      <Image
        source={
          isLogin
            ? require('@/assets/images/project-images/login-logo.png')
            : require('@/assets/images/project-images/register-logo.png')
        }
        style={[styles.heroImage, isLogin && styles.loginHeroImage]}
        contentFit="contain"
      />
      <View style={styles.header}>
        <Text style={styles.title}>{PROJECT_NAME}</Text>
        {isLogin ? (
          <Text style={styles.subtitle}>Welcome back</Text>
        ) : (
          <Text style={styles.subtitle}>Create an account</Text>
        )}
        {isLogin ? (
          <Text style={styles.description}>
            Login to your account to start tracking your favorite media
          </Text>
        ) : (
          <Text style={styles.description}>
            Create an account to start tracking your favorite movies, series, games and books
          </Text>
        )}
      </View>
      <View style={styles.form}>
        <View style={styles.inputs}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    gap: 16,
  },

  inputs: {
    gap: 16,
    marginHorizontal: 10,
  },

  gradient: {
    ...StyleSheet.absoluteFill,
  },

  heroImage: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,

    width: '100%',
    height: 130,
  },

  loginHeroImage: {
    top: 60,
    height: 170,
  },

  header: {
    marginTop: 220,
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
    marginHorizontal: 20,
  },
});
