import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart'], // auth state is re-derived from Firebase's own session on launch
};

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
});

export default persistReducer(persistConfig, rootReducer);
