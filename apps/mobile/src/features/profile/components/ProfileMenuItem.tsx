import type { LucideIcon } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';

interface ProfileMenuItemProps extends PressableProps {
  label: string;
  icon: LucideIcon;
  danger?: boolean;
  showDivider?: boolean;
}

export default function ProfileMenuItem({
  label,
  icon: Icon,
  danger = false,
  showDivider = true,
  style,
  ...props
}: ProfileMenuItemProps) {
  const color = danger ? '#FF6474' : '#A8B2C4';

  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={(state) => [
        styles.container,
        state.pressed && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon size={24} strokeWidth={2} color={color} />
      </View>

      <View style={[styles.content, showDivider && styles.divider]}>
        <Text numberOfLines={1} style={[styles.label, danger && styles.dangerLabel]}>
          {label}
        </Text>

        <ChevronRight size={22} strokeWidth={1.8} color="#5E6879" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 62,

    flexDirection: 'row',
    alignItems: 'stretch',

    paddingLeft: 20,
  },

  pressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
  },

  iconContainer: {
    width: 44,

    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  content: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingRight: 16,
  },

  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(145, 160, 185, 0.13)',
  },

  label: {
    flexShrink: 1,
    marginRight: 12,

    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: semanticColors.text.primary,
  },

  dangerLabel: {
    color: '#FF6474',
  },
});
