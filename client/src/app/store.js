import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../features/userSlice';


const store = configureStore({
  reducer: userSlice,
});

export default store
