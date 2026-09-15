import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.palette.primary,
  },
  hero: {
    flex: 0.45,
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    overflow: 'hidden',
  },
  decorCircleLarge: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -70,
    right: -70,
  },
  decorCircleSmall: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -40,
    left: -30,
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
    fontSize: 34,
    lineHeight: 38,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.white,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: theme.typography.size.body,
    color: 'rgba(255,255,255,0.7)',
    marginTop: theme.spacing.xs,
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
  heading: {
    fontSize: theme.typography.size.h1,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.label,
  },
  subheading: {
    fontSize: theme.typography.size.body,
    color: theme.palette.secondaryLabel,
    marginTop: theme.spacing.xs,
  },
  error: {
    color: theme.palette.error,
    fontSize: theme.typography.size.sub,
    marginTop: theme.spacing.md,
  },
  legal: {
    fontSize: theme.typography.size.caption,
    color: theme.palette.tertiaryLabel,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});

export default styles;
