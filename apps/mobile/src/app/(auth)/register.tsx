import { Screen } from '@/shared/ui';
import { RegisterForm } from '@/features/auth';

export default function Register() {
  return (
    <Screen edges={[]}>
      <RegisterForm />
    </Screen>
  );
}
