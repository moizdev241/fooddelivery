import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.palette.primary,
  },
  hero: {
    flex: 0.32,
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -60,
    right: -60,
  },
  eyebrow: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  wordmark: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.white,
    letterSpacing: -0.3,
  },
  sheet: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.palette.bg,
    borderTopLeftRadius: theme.radius.r3,
    borderTopRightRadius: theme.radius.r3,
    marginTop: -theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  subheading: {
    fontSize: theme.typography.size.body,
    color: theme.palette.secondaryLabel,
    marginBottom: theme.spacing.lg,
  },
  error: {
    color: theme.palette.error,
    fontSize: theme.typography.size.sub,
    marginBottom: theme.spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.palette.border,
    borderRadius: theme.radius.r2,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  optionCardActive: {
    borderColor: theme.palette.primary,
    backgroundColor: theme.palette.primaryTint,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.round,
    backgroundColor: theme.palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  optionIconActive: {
    backgroundColor: theme.palette.primary,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    color: theme.palette.label,
  },
  optionDescription: {
    fontSize: theme.typography.size.caption,
    color: theme.palette.secondaryLabel,
    marginTop: 2,
  },
  footerRow: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  footerLink: {
    color: theme.palette.secondaryLabel,
    fontSize: theme.typography.size.sub,
  },
});

export default styles;
