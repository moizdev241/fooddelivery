import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../../theme';
import { ACTIVE_OPACITY } from '../../../constants/constants';
import { Txt } from '../../atoms';

interface Props {
  title: string;
  subtitle?: string;
  onAddPress?: () => void;
}

const PageHeader: React.FC<Props> = ({ title, subtitle, onAddPress }) => (
  <View style={styles.row}>
    <View style={styles.textBlock}>
      <Txt style={styles.title} numberOfLines={1}>
        {title}
      </Txt>
      {subtitle ? (
        <Txt style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Txt>
      ) : null}
    </View>
    {onAddPress ? (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} style={styles.addButton} onPress={onAddPress}>
        <Feather name="plus" size={22} color={theme.palette.white} />
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  textBlock: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.size.title,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.label,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.round,
    backgroundColor: theme.palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PageHeader;
