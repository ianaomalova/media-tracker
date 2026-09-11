import { Text } from 'react-native';
import Screen from '@/components/Screen';
import Button from '@/components/ui/Button';
import { Delete, Download, Plus } from 'lucide-react-native';
import { useSearchSearch } from '@app/api-client';

export default function HomeScreen() {
  const { data, isPending, error } = useSearchSearch({
    q: 'search',
  });

  console.log({ data, isPending, error });

  return (
    <Screen edges={['top']}>
      <Text>HOME78</Text>
      <Button variant="primary" icon={Download}>
        Primary
      </Button>
      <Button variant="secondary" icon={Plus}>
        Secondary
      </Button>
      <Button variant="primary" icon={Delete}></Button>
    </Screen>
  );
}
