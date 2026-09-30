import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface ProfileMenuSectionProps {
  children: ReactNode;
}

export default function ProfileMenuSection({ children }: ProfileMenuSectionProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',

    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(127, 151, 190, 0.18)',

    backgroundColor: 'rgba(16, 25, 40, 0.88)',
  },
});
