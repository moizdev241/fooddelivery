import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../../../theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

const CustomTextInput: React.FC<Props> = ({ label, error, style, multiline, ...rest }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[
          styles.input,
          multiline ? styles.inputMultiline : null,
          error ? styles.inputError : null,
          style,
        ]}
        placeholderTextColor={theme.palette.tertiaryLabel}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={multiline}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    marginBottom: theme.spacing.xs,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.palette.border,
    borderRadius: theme.radius.r1,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.size.body,
    color: theme.palette.label,
    backgroundColor: theme.palette.surface,
  },
  inputMultiline: {
    height: undefined,
    minHeight: 90,
    paddingTop: theme.spacing.sm,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: theme.palette.error,
  },
  error: {
    fontSize: theme.typography.size.caption,
    color: theme.palette.error,
    marginTop: theme.spacing.xs,
  },
});

export default CustomTextInput;
