import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../theme';
import { OrderStatus, ORDER_STATUS, ORDER_STATUS_LABEL } from '../../../constants/constants';

const statusColor = (status: OrderStatus): string => {
  switch (status) {
    case ORDER_STATUS.DELIVERED:
    case ORDER_STATUS.RECEIVED:
      return theme.palette.success;
    case ORDER_STATUS.CANCELED:
      return theme.palette.error;
    case ORDER_STATUS.PROCESSING:
      return theme.palette.warning;
    case ORDER_STATUS.IN_ROUTE:
      return theme.palette.info;
    default:
      return theme.palette.secondaryLabel;
  }
};

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const color = statusColor(status);
  return (
    <View style={[styles.badge, { backgroundColor: `${color}1A`, borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{ORDER_STATUS_LABEL[status]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.round,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
  },
});

export default StatusBadge;
