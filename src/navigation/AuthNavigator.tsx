import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, CompleteProfile } from '../screens';
import { Screens } from '../constants/constants';
import { RootStackParamList } from './types';
import { useAppSelector } from '../redux/hooks';

const Stack = createNativeStackNavigator<Pick<RootStackParamList, 'SignIn' | 'CompleteProfile'>>();

export default function AuthNavigator() {
  // Signed into Firebase via Google but no Firestore profile yet — skip
  // straight to the role-picker step instead of the sign-in screen.
  const pendingAuth = useAppSelector(state => state.user.pendingAuth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {pendingAuth ? (
        <Stack.Screen name={Screens.CompleteProfile} component={CompleteProfile} />
      ) : (
        <Stack.Screen name={Screens.SignIn} component={SignIn} />
      )}
    </Stack.Navigator>
  );
}
