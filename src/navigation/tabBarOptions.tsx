import React from 'react';
import { theme } from '../theme';
import { TabIcon } from '../components/atoms';

// Shared tab bar styling — single accent color, Feather line icons.
export const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: theme.palette.primary,
  tabBarInactiveTintColor: theme.palette.tertiaryLabel,
  tabBarStyle: {
    backgroundColor: theme.palette.bg,
    borderTopColor: theme.palette.border,
  },
  tabBarLabelStyle: {
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.medium,
  },
};

// A stable (module-scope, not recreated on render) icon renderer per Feather
// icon name, for the `tabBarIcon` option.
export const makeTabIcon = (name: string) => {
  const render = ({ color, size }: { color: string; size: number }) => (
    <TabIcon name={name} color={color} size={size} />
  );
  render.displayName = `TabIcon(${name})`;
  return render;
};
