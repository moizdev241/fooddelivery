import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  collectionGroup,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  arrayUnion,
} from '@react-native-firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from '@react-native-firebase/auth';

const app = getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  auth,
  // firestore
  collection,
  collectionGroup,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  arrayUnion,
  // auth
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
};
