import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.bg,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  restaurantName: {
    fontSize: theme.typography.size.h1,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.label,
  },
  restaurantDescription: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    marginTop: 2,
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 100,
  },
  cartBar: {
    position: 'absolute',
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    backgroundColor: theme.palette.primary,
    borderRadius: theme.radius.r1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: theme.palette.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  cartBarText: {
    color: theme.palette.white,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.body,
  },
  cartBarSubtext: {
    color: theme.palette.white,
    opacity: 0.85,
    fontSize: theme.typography.size.caption,
  },
  cartBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default styles;
