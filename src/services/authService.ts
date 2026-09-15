import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  auth,
  db,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from '../firebase';
import { GOOGLE_WEB_CLIENT_ID, ROLE_USER, UserRole } from '../constants/constants';
import { UserProfile } from '../types';

GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });

// Resolves once the Google account picker completes; a no-op if the user
// cancels it. Firebase's own onAuthStateChanged listener (RootNavigator)
// picks up the resulting session automatically.
export const signInWithGoogle = async (): Promise<void> => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const response = await GoogleSignin.signIn();
  if (response.type === 'cancelled') {
    return;
  }

  const { idToken } = response.data;
  if (!idToken) {
    throw new Error('Google sign-in did not return a token. Please try again.');
  }

  const credential = GoogleAuthProvider.credential(idToken);
  await signInWithCredential(auth, credential);
};

export const logOut = async (): Promise<void> => {
  await signOut(auth);
  try {
    await GoogleSignin.signOut();
  } catch {
    // Not signed in via Google this session (e.g. a restored session) —
    // nothing to clear.
  }
};

export const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists) {
    return null;
  }
  const data = snap.data() as any;
  return {
    uid,
    name: data.name,
    email: data.email,
    role: data.role ?? ROLE_USER,
    isBlocked: !!data.isBlocked,
  };
};

export const createUserProfile = async (
  uid: string,
  email: string,
  name: string,
  role: UserRole,
): Promise<UserProfile> => {
  const profile: UserProfile = { uid, name, email, role, isBlocked: false };
  await setDoc(doc(db, 'users', uid), { ...profile, createdAt: serverTimestamp() });
  return profile;
};

// Demo-only convenience: lets a single account flip between the Customer
// and Restaurant Owner experience from the Profile screen, rather than
// requiring a second Google account to see both roles.
export const updateUserRole = async (uid: string, role: UserRole): Promise<void> => {
  await updateDoc(doc(db, 'users', uid), { role });
};
