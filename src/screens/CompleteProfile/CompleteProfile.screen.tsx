import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { CustomButton, Txt } from '../../components/atoms';
import { ACTIVE_OPACITY, ROLE_OWNER, ROLE_USER, UserRole } from '../../constants/constants';
import { createUserProfile, logOut } from '../../services/authService';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setProfile, logout } from '../../redux/slices/userSlice';
import { theme } from '../../theme';
import styles from './styles';

export default function CompleteProfile() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const pendingAuth = useAppSelector(state => state.user.pendingAuth);

  const [role, setRole] = useState<UserRole>(ROLE_USER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    if (!pendingAuth) return;
    setError('');
    setLoading(true);
    try {
      const profile = await createUserProfile(
        pendingAuth.uid,
        pendingAuth.email,
        pendingAuth.name,
        role,
      );
      dispatch(setProfile(profile));
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onNotYou = async () => {
    await logOut();
    dispatch(logout());
  };

  if (!pendingAuth) return null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.hero, { paddingTop: insets.top + theme.spacing.lg }]}>
        <View style={styles.decorCircle} />
        <Txt style={styles.eyebrow}>Almost there</Txt>
        <Txt style={styles.wordmark}>{pendingAuth.name || pendingAuth.email}</Txt>
      </View>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
        <View>
          <Txt style={styles.subheading}>One last step — how will you be using the app?</Txt>

          {error ? <Txt style={styles.error}>{error}</Txt> : null}

          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={[styles.optionCard, role === ROLE_USER && styles.optionCardActive]}
            onPress={() => setRole(ROLE_USER)}>
            <View style={[styles.optionIcon, role === ROLE_USER && styles.optionIconActive]}>
              <Feather
                name="user"
                size={18}
                color={role === ROLE_USER ? theme.palette.white : theme.palette.secondaryLabel}
              />
            </View>
            <View style={styles.optionText}>
              <Txt style={styles.optionTitle}>Customer</Txt>
              <Txt style={styles.optionDescription}>Browse restaurants and place orders</Txt>
            </View>
            {role === ROLE_USER ? (
              <Feather name="check-circle" size={20} color={theme.palette.primary} />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={[styles.optionCard, role === ROLE_OWNER && styles.optionCardActive]}
            onPress={() => setRole(ROLE_OWNER)}>
            <View style={[styles.optionIcon, role === ROLE_OWNER && styles.optionIconActive]}>
              <Feather
                name="home"
                size={18}
                color={role === ROLE_OWNER ? theme.palette.white : theme.palette.secondaryLabel}
              />
            </View>
            <View style={styles.optionText}>
              <Txt style={styles.optionTitle}>Restaurant Owner</Txt>
              <Txt style={styles.optionDescription}>Manage your restaurant and meals</Txt>
            </View>
            {role === ROLE_OWNER ? (
              <Feather name="check-circle" size={20} color={theme.palette.primary} />
            ) : null}
          </TouchableOpacity>
        </View>

        <View>
          <CustomButton title="Continue" onPress={onSubmit} loading={loading} />
          <View style={styles.footerRow}>
            <Txt style={styles.footerLink} onPress={onNotYou}>
              Not you? Sign out
            </Txt>
          </View>
        </View>
      </View>
    </View>
  );
}
