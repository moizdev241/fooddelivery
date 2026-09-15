import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, Txt } from '../../components/atoms';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/userSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import { logOut } from '../../services/authService';
import { ROLE_OWNER } from '../../constants/constants';
import { theme } from '../../theme';
import styles from './styles';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const [loggingOut, setLoggingOut] = useState(false);

  const onLogout = async () => {
    setLoggingOut(true);
    try {
      await logOut();
      dispatch(logout());
      dispatch(clearCart());
    } finally {
      setLoggingOut(false);
    }
  };

  if (!profile) return null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.hero, { paddingTop: insets.top + theme.spacing.lg }]}>
        <View style={styles.decorCircle} />
        <View style={styles.avatar}>
          <Txt style={styles.avatarText}>{profile.name.charAt(0).toUpperCase()}</Txt>
        </View>
        <Txt style={styles.name}>{profile.name}</Txt>
        <Txt style={styles.email}>{profile.email}</Txt>
      </View>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
        <View style={styles.roleBadge}>
          <Txt style={styles.roleText}>
            {profile.role === ROLE_OWNER ? 'Restaurant Owner' : 'Customer'}
          </Txt>
        </View>

        <CustomButton
          title="Log Out"
          variant="secondary"
          icon="log-out"
          onPress={onLogout}
          loading={loggingOut}
          style={styles.logoutButton}
        />
      </View>
    </View>
  );
}
