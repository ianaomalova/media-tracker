import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import { colors, fontSize, fontWeight, semanticColors } from '@app/design-tokens';

interface Props extends PressableProps {
  children?: ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  iconOnly?: boolean;
}

export default function Button({ children, icon: Icon, variant = 'primary', ...props }: Props) {
  const isPrimary = variant === 'primary';
  const iconOnly = Boolean(Icon && !children);

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        iconOnly && styles.iconOnly,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      {Icon && <Icon size={22} strokeWidth={2} color={isPrimary ? colors.black : colors.white} />}

      {!iconOnly && children && (
        <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',

    gap: 10,
    paddingHorizontal: 24,

    borderRadius: 999,
  },

  iconOnly: {
    width: 52,
    paddingHorizontal: 0,
  },

  primary: {
    backgroundColor: semanticColors.primary,
  },

  secondary: {
    backgroundColor: semanticColors.secondary,
  },

  text: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },

  primaryText: {
    color: semanticColors.text.secondary,
  },

  secondaryText: {
    color: semanticColors.text.primary,
  },

  pressed: {
    opacity: 0.7,
  },
});
