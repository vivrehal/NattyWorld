import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';


const store = configureStore({ 
  reducer: userSlice,
  // Add any middleware or enhancers here
});

export default store
