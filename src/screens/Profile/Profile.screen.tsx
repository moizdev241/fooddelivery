import React, { useState } from 'react';
import { Alert, StatusBar, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, Txt } from '../../components/atoms';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setProfile, logout } from '../../redux/slices/userSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import { logOut, updateUserRole } from '../../services/authService';
import { ACTIVE_OPACITY, ROLE_OWNER, ROLE_USER, UserRole } from '../../constants/constants';
import { theme } from '../../theme';
import styles from './styles';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const [loggingOut, setLoggingOut] = useState(false);
  const [switchingRole, setSwitchingRole] = useState(false);

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

  const onSelectRole = (nextRole: UserRole) => {
    if (!profile || profile.role === nextRole || switchingRole) return;

    const roleLabel = nextRole === ROLE_OWNER ? 'Restaurant Owner' : 'Customer';
    Alert.alert(`Switch to ${roleLabel}?`, `You'll see the ${roleLabel} version of the app.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Switch',
        onPress: async () => {
          setSwitchingRole(true);
          try {
            await updateUserRole(profile.uid, nextRole);
            dispatch(setProfile({ ...profile, role: nextRole }));
            dispatch(clearCart());
          } finally {
            setSwitchingRole(false);
          }
        },
      },
    ]);
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

        <View style={styles.section}>
          <Txt style={styles.sectionLabel}>Viewing as</Txt>
          <View style={styles.segment}>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              disabled={switchingRole}
              style={[
                styles.segmentOption,
                profile.role === ROLE_USER && styles.segmentOptionActive,
              ]}
              onPress={() => onSelectRole(ROLE_USER)}>
              <Txt
                style={[
                  styles.segmentText,
                  profile.role === ROLE_USER && styles.segmentTextActive,
                ]}>
                Customer
              </Txt>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              disabled={switchingRole}
              style={[
                styles.segmentOption,
                profile.role === ROLE_OWNER && styles.segmentOptionActive,
              ]}
              onPress={() => onSelectRole(ROLE_OWNER)}>
              <Txt
                style={[
                  styles.segmentText,
                  profile.role === ROLE_OWNER && styles.segmentTextActive,
                ]}>
                Restaurant Owner
              </Txt>
            </TouchableOpacity>
          </View>
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
