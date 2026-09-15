import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from '../../../theme';
import { ACTIVE_OPACITY, ORDER_STATUS_LABEL } from '../../../constants/constants';
import { StatusBadge, Txt } from '../../atoms';
import { Order } from '../../../types';
import { formatCurrency, formatDate } from '../../../utils/common';

interface Props {
  order: Order;
  showCustomer?: boolean;
  footer?: React.ReactNode;
}

const OrderCard: React.FC<Props> = ({ order, showCustomer = false, footer }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Txt style={styles.restaurant} numberOfLines={1}>
          {order.restaurantName}
        </Txt>
        <StatusBadge status={order.status} />
      </View>

      {showCustomer ? <Txt style={styles.customer}>Ordered by {order.userName}</Txt> : null}

      {order.items.map(item => (
        <Txt key={item.mealId} style={styles.itemLine}>
          {item.quantity}× {item.name}
        </Txt>
      ))}

      <View style={styles.footerRow}>
        <Txt style={styles.date}>{formatDate(order.createdAt)}</Txt>
        <Txt style={styles.total}>{formatCurrency(order.totalAmount)}</Txt>
      </View>

      {order.statusHistory?.length > 0 ? (
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          onPress={() => setShowHistory(v => !v)}
          style={styles.historyToggle}>
          <Txt style={styles.historyToggleText}>
            {showHistory ? 'Hide history' : 'View history'}
          </Txt>
        </TouchableOpacity>
      ) : null}

      {showHistory ? (
        <View style={styles.historyList}>
          {order.statusHistory.map((change, index) => (
            <View key={`${change.status}-${index}`} style={styles.historyRow}>
              <Txt style={styles.historyStatus}>{ORDER_STATUS_LABEL[change.status]}</Txt>
              <Txt style={styles.historyDate}>{formatDate(change.changedAt)}</Txt>
            </View>
          ))}
        </View>
      ) : null}

      {footer}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.palette.bg,
    borderRadius: theme.radius.r2,
    borderWidth: 1,
    borderColor: theme.palette.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  restaurant: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    color: theme.palette.label,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  customer: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
    marginBottom: theme.spacing.xs,
  },
  itemLine: {
    fontSize: theme.typography.size.sub,
    color: theme.palette.secondaryLabel,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  date: {
    fontSize: theme.typography.size.caption,
    color: theme.palette.tertiaryLabel,
  },
  total: {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.bold,
    color: theme.palette.primary,
  },
  historyToggle: {
    marginTop: theme.spacing.sm,
  },
  historyToggleText: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
    color: theme.palette.primary,
  },
  historyList: {
    marginTop: theme.spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.palette.border,
    paddingTop: theme.spacing.xs,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  historyStatus: {
    fontSize: theme.typography.size.caption,
    color: theme.palette.label,
    fontWeight: theme.typography.weight.medium,
  },
  historyDate: {
    fontSize: theme.typography.size.caption,
    color: theme.palette.tertiaryLabel,
  },
});

export default OrderCard;
