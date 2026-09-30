import { Screen } from '@/shared/ui';
import { LoginForm } from '@/features/auth';

export default function Login() {
  return (
    <Screen edges={[]}>
      <LoginForm />
    </Screen>
  );
}
