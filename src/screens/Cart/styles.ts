import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.bg,
    paddingHorizontal: theme.spacing.lg,
  },
  emptyButton: {
    marginTop: theme.spacing.lg,
    alignSelf: 'center',
  },
  header: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.size.h1,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.label,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  restaurantName: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    marginLeft: 6,
  },
  list: {
    paddingBottom: theme.spacing.md,
  },
  summary: {
    backgroundColor: theme.palette.surface,
    borderRadius: theme.radius.r2,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  totalLabel: {
    fontSize: theme.typography.size.body,
    color: theme.palette.secondaryLabel,
  },
  totalValue: {
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.label,
  },
});

export default styles;
