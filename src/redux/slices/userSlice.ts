import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../types';

interface PendingAuth {
  uid: string;
  email: string;
  name: string;
}

interface UserState {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean; // true while checking persisted auth session on launch
  // Signed in with Firebase via Google, but no Firestore profile exists yet
  // — the user still needs to pick a role to finish setup.
  pendingAuth: PendingAuth | null;
}

const initialState: UserState = {
  profile: null,
  isAuthenticated: false,
  isBootstrapping: true,
  pendingAuth: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
      state.isAuthenticated = true;
      state.pendingAuth = null;
    },
    setPendingAuth(state, action: PayloadAction<PendingAuth>) {
      state.pendingAuth = action.payload;
      state.profile = null;
      state.isAuthenticated = false;
    },
    setBootstrapping(state, action: PayloadAction<boolean>) {
      state.isBootstrapping = action.payload;
    },
    logout(state) {
      state.profile = null;
      state.isAuthenticated = false;
      state.pendingAuth = null;
    },
  },
});

export const { setProfile, setPendingAuth, setBootstrapping, logout } = userSlice.actions;
export default userSlice.reducer;
