import { spacing } from '@app/design-tokens';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: spacing[0],
        paddingBottom: insets.bottom,
      }}
    >
      <Text>PROFILE</Text>
    </View>
  );
}
