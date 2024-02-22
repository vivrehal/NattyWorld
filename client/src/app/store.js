import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from '../features/userSlice';

const persistConfig = {
  timeout: 500,
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: persistedReducer,
  // Add any middleware or enhancers here
});

const persistor = persistStore(store);

export { persistor };;
export default store
