import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, Txt } from '../../components/atoms';
import { APP_NAME } from '../../constants/constants';
import { signInWithGoogle } from '../../services/authService';
import { theme } from '../../theme';
import styles from './styles';

export default function SignIn() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onContinueWithGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      // RootNavigator swaps to the app (or role setup) automatically once
      // Firebase's own auth-state listener picks this up.
    } catch (e: any) {
      setError(e?.message ?? 'Could not sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.hero, { paddingTop: insets.top + theme.spacing.lg }]}>
        <View style={styles.decorCircleLarge} />
        <View style={styles.decorCircleSmall} />
        <Txt style={styles.eyebrow}>Welcome to</Txt>
        <Txt style={styles.wordmark}>{APP_NAME}</Txt>
        <Txt style={styles.tagline}>Fast, fresh, delivered to your door.</Txt>
      </View>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
        <View>
          <Txt style={styles.heading}>Get started</Txt>
          <Txt style={styles.subheading}>
            Sign in to order food or manage your restaurant.
          </Txt>
          {error ? <Txt style={styles.error}>{error}</Txt> : null}
        </View>

        <View>
          <CustomButton
            title="Continue with Google"
            onPress={onContinueWithGoogle}
            loading={loading}
          />
          <Txt style={styles.legal}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Txt>
        </View>
      </View>
    </View>
  );
}
