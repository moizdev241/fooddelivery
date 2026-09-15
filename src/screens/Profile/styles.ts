import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.palette.primary,
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing.xl,
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -70,
    left: -60,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: theme.radius.round,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.white,
  },
  name: {
    fontSize: theme.typography.size.h1,
    fontWeight: theme.typography.weight.semibold,
    color: theme.palette.white,
  },
  email: {
    fontSize: theme.typography.size.sub,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  sheet: {
    flex: 1,
    backgroundColor: theme.palette.bg,
    borderTopLeftRadius: theme.radius.r3,
    borderTopRightRadius: theme.radius.r3,
    marginTop: -theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  roleBadge: {
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.round,
    backgroundColor: theme.palette.primaryTint,
  },
  roleText: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    color: theme.palette.primary,
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: theme.spacing.lg,
  },
});

export default styles;
