import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import { View, Text, StyleSheet } from 'react-native';

//TODO maybe to do different badges for different roles
interface Props {
  role: string;
}

export default function BadgeRole({ role }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,

    borderRadius: 999,

    backgroundColor: 'rgba(74, 144, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(100, 165, 255, 0.35)',
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,

    color: '#7DB5FF',

    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
