import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../../theme';
import { ACTIVE_OPACITY } from '../../../constants/constants';

interface Props extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  icon?: string;
  loading?: boolean;
  style?: ViewStyle;
}

const CustomButton: React.FC<Props> = ({
  title,
  variant = 'primary',
  icon,
  loading = false,
  disabled,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  const iconColor = variant === 'secondary' ? theme.palette.label : theme.palette.white;

  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      disabled={isDisabled}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'destructive' && styles.destructive,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' ? theme.palette.primary : theme.palette.white}
        />
      ) : (
        <>
          {icon ? (
            <Feather name={icon} size={18} color={iconColor} style={styles.icon} />
          ) : null}
          <Text style={[styles.text, variant === 'secondary' && styles.textSecondary]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: 50,
    borderRadius: theme.radius.r1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  primary: {
    backgroundColor: theme.palette.primary,
  },
  secondary: {
    backgroundColor: theme.palette.bg,
    borderWidth: 1,
    borderColor: theme.palette.border,
  },
  destructive: {
    backgroundColor: theme.palette.error,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    color: theme.palette.white,
  },
  textSecondary: {
    color: theme.palette.label,
  },
});

export default CustomButton;
