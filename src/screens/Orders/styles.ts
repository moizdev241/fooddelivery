import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.bg,
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
  },
  actionButton: {
    paddingVertical: 9,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.r0,
    backgroundColor: theme.palette.primary,
    marginRight: theme.spacing.sm,
  },
  actionButtonText: {
    color: theme.palette.white,
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
  },
  cancelButton: {
    backgroundColor: theme.palette.error,
  },
  cancelButtonText: {
    color: theme.palette.white,
  },
});

export default styles;
