import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from '../../../theme';
import { ACTIVE_OPACITY } from '../../../constants/constants';
import { Txt } from '../../atoms';
import { Restaurant } from '../../../types';

interface Props {
  restaurant: Restaurant;
  onPress: () => void;
  rightAccessory?: React.ReactNode;
}

const RestaurantCard: React.FC<Props> = ({ restaurant, onPress, rightAccessory }) => (
  <TouchableOpacity activeOpacity={ACTIVE_OPACITY} style={styles.card} onPress={onPress}>
    <View style={styles.avatar}>
      <Txt style={styles.avatarText}>{restaurant.name.charAt(0).toUpperCase()}</Txt>
    </View>
    <View style={styles.info}>
      <Txt style={styles.name} numberOfLines={1}>
        {restaurant.name}
      </Txt>
      <Txt style={styles.description} numberOfLines={1}>
        {restaurant.description}
      </Txt>
    </View>
    {rightAccessory}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.bg,
    borderRadius: theme.radius.r2,
    borderWidth: 1,
    borderColor: theme.palette.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.r1,
    backgroundColor: theme.palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  avatarText: {
    color: theme.palette.primary,
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.h2,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    color: theme.palette.label,
  },
  description: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    marginTop: 2,
  },
});

export default RestaurantCard;
