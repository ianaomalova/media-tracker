import { colors, fontWeight, semanticColors } from '@app/design-tokens';
import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, TextInput, View, Text, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export default function Input({
  label,
  error,
  icon: Icon,
  style,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {Icon && <Icon size={20} color={semanticColors.text.placeholderIcon} style={styles.icon} />}
        <TextInput
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          style={[styles.input, style]}
          placeholderTextColor={semanticColors.text.placeholder}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: semanticColors.text.primary,
  },

  inputError: {
    borderColor: colors.red[500],
  },

  inputFocused: {
    borderColor: colors.white,
  },

  label: {
    fontSize: 16,
    fontWeight: fontWeight.regular,
    color: semanticColors.text.primary,
    opacity: 0.7,
    marginBottom: 8,
    marginLeft: 8,
  },

  errorText: {
    fontSize: 12,
    color: colors.red[500],
    marginTop: 6,
    marginLeft: 12,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.gray[500],
    borderRadius: 20,
    paddingHorizontal: 16,
  },

  icon: {
    flexShrink: 0,
  },
});
