import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { auth, db, onAuthStateChanged, doc, onSnapshot, signOut } from '../firebase';
import { Loader } from '../components/atoms';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setProfile, setPendingAuth, setBootstrapping, logout } from '../redux/slices/userSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { fetchUserProfile } from '../services/authService';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const isBootstrapping = useAppSelector(state => state.user.isBootstrapping);
  const uid = useAppSelector(state => state.user.profile?.uid);

  // Bootstraps auth state from Firebase's own persisted session on launch,
  // and keeps it in sync afterwards (including right after a Google
  // sign-in, which fires this same listener).
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (!firebaseUser) {
        dispatch(logout());
        dispatch(setBootstrapping(false));
        return;
      }
      const profile = await fetchUserProfile(firebaseUser.uid);
      if (profile?.isBlocked) {
        await signOut(auth);
        dispatch(logout());
      } else if (profile) {
        dispatch(setProfile(profile));
      } else {
        // Signed into Firebase via Google for the first time — still needs
        // to pick a role before a Firestore profile exists.
        dispatch(
          setPendingAuth({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? '',
            name: firebaseUser.displayName ?? '',
          }),
        );
      }
      dispatch(setBootstrapping(false));
    });
    return unsubscribe;
  }, [dispatch]);

  // Live-watches the signed-in user's own doc so an owner blocking them
  // mid-session signs them out immediately.
  useEffect(() => {
    if (!uid) return;
    const unsubscribe = onSnapshot(doc(db, 'users', uid), snapshot => {
      const data = snapshot.data() as any;
      if (data?.isBlocked) {
        signOut(auth).then(() => {
          dispatch(logout());
          dispatch(clearCart());
          Alert.alert('Account blocked', 'The restaurant owner has blocked your account.');
        });
      }
    });
    return unsubscribe;
  }, [uid, dispatch]);

  if (isBootstrapping) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
