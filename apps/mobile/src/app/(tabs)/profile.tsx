import Screen from '@/components/Screen';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function ProfileScreen() {
  return (
    <Screen edges={['top']}>
      <View style={{ gap: 16 }}>
        <Button onPress={() => router.push('/(auth)/register')}>Регистрация</Button>
      </View>
    </Screen>
  );
}
