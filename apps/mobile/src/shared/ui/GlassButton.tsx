import type { ReactNode } from 'react';
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';

interface GlassButtonProps extends Omit<PressableProps, 'children'> {
  children: ReactNode;
  effect?: 'clear' | 'regular';
  tintColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

const nativeGlassAvailable =
  Platform.OS === 'ios' && isGlassEffectAPIAvailable() && isLiquidGlassAvailable();

export default function GlassButton({
  children,
  disabled = false,
  effect = 'clear',
  tintColor,
  textStyle,
  style,
  ...props
}: GlassButtonProps) {
  const content =
    typeof children === 'string' || typeof children === 'number' ? (
      <Text style={[styles.text, textStyle]}>{children}</Text>
    ) : (
      children
    );

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      {...props}
      style={(state) => [
        styles.button,
        !nativeGlassAvailable && styles.fallback,
        typeof style === 'function' ? style(state) : style,
        state.pressed && !disabled && styles.pressed,
      ]}
    >
      {nativeGlassAvailable && (
        <GlassView
          glassEffectStyle={effect}
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          tintColor={tintColor}
        />
      )}

      <View style={[styles.content, disabled && styles.disabledContent]}>{content}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    minWidth: 38,
    borderRadius: 999,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },

  fallback: {
    backgroundColor: 'rgba(45, 45, 48, 0.78)',
  },

  content: {
    width: 38,
    minWidth: 38,
    height: '100%',
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  text: {
    color: semanticColors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },

  pressed: {
    transform: [{ scale: 0.96 }],
  },

  disabledContent: {
    opacity: 0.45,
  },
});
