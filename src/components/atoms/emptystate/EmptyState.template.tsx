import React from 'react';
import { StyleSheet, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../../theme';
import Txt from '../text/Txt.template';

interface Props {
  title: string;
  subtitle?: string;
  icon?: string;
}

const EmptyState: React.FC<Props> = ({ title, subtitle, icon }) => (
  <View style={styles.container}>
    {icon ? (
      <View style={styles.iconBadge}>
        <Feather name={icon} size={22} color={theme.palette.secondaryLabel} />
      </View>
    ) : null}
    <Txt style={styles.title}>{title}</Txt>
    {subtitle ? <Txt style={styles.subtitle}>{subtitle}</Txt> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.round,
    backgroundColor: theme.palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.semibold,
    color: theme.palette.label,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
});

export default EmptyState;
