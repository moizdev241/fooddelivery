import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { theme } from '../../../theme';

const Loader: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={theme.palette.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.bg,
  },
});

export default Loader;
