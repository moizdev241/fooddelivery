import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../../theme';
import { ACTIVE_OPACITY } from '../../../constants/constants';
import { Txt } from '../../atoms';
import { Meal } from '../../../types';
import { formatCurrency } from '../../../utils/common';

interface Props {
  meal: Meal;
  quantity?: number;
  onAdd?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MealRow: React.FC<Props> = ({ meal, quantity = 0, onAdd, onRemove, onEdit, onDelete }) => (
  <View style={styles.row}>
    <View style={styles.info}>
      <Txt style={styles.name}>{meal.name}</Txt>
      {meal.description ? (
        <Txt style={styles.description} numberOfLines={2}>
          {meal.description}
        </Txt>
      ) : null}
      <Txt style={styles.price}>{formatCurrency(meal.price)}</Txt>
    </View>

    {onAdd ? (
      <View style={styles.stepper}>
        {quantity > 0 ? (
          <>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              style={styles.stepBtnOutline}
              onPress={onRemove}>
              <Feather name="minus" size={16} color={theme.palette.primary} />
            </TouchableOpacity>
            <Txt style={styles.qty}>{quantity}</Txt>
          </>
        ) : null}
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} style={styles.stepBtn} onPress={onAdd}>
          <Feather name="plus" size={16} color={theme.palette.white} />
        </TouchableOpacity>
      </View>
    ) : null}

    {onEdit ? (
      <View style={styles.ownerActions}>
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} style={styles.linkRow} onPress={onEdit}>
          <Feather name="edit-2" size={14} color={theme.palette.label} />
          <Txt style={styles.link}>Edit</Txt>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} style={styles.linkRow} onPress={onDelete}>
          <Feather name="trash-2" size={14} color={theme.palette.error} />
          <Txt style={[styles.link, styles.deleteLink]}>Delete</Txt>
        </TouchableOpacity>
      </View>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.palette.border,
  },
  info: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    color: theme.palette.label,
  },
  description: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    marginTop: 2,
  },
  price: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.primary,
    fontWeight: theme.typography.weight.semibold,
    marginTop: 4,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepBtn: {
    width: 30,
    height: 30,
    borderRadius: theme.radius.round,
    backgroundColor: theme.palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnOutline: {
    width: 30,
    height: 30,
    borderRadius: theme.radius.round,
    borderWidth: 1,
    borderColor: theme.palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
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

export default MealRow;
