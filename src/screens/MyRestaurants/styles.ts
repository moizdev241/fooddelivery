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
  ownerActions: {
    alignItems: 'flex-end',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  link: {
    color: theme.palette.label,
    fontSize: theme.typography.size.sub,
    fontWeight: theme.typography.weight.medium,
    marginLeft: 5,
  },
  deleteLink: {
    color: theme.palette.error,
    marginBottom: 0,
  },
});

export default styles;
