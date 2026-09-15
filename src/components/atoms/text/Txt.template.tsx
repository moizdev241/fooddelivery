import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const Txt: React.FC<TextProps> = ({ style, children, ...rest }) => {
  return (
    <Text style={[styles.base, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: theme.typography.size.body,
    color: theme.palette.label,
  },
});

export default Txt;
