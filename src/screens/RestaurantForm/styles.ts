import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.bg,
  },
  content: {
    padding: theme.spacing.lg,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.r2,
    backgroundColor: theme.palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.size.h1,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.label,
  },
  subtitle: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    marginTop: 2,
    marginBottom: theme.spacing.lg,
  },
  error: {
    color: theme.palette.error,
    fontSize: theme.typography.size.sub,
    marginBottom: theme.spacing.md,
  },
});

export default styles;
