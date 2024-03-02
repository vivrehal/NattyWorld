import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, actions) {
      state.user = actions.payload;
    },
  },
});

export const { setUser} = userSlice.actions;

export default userSlice.reducer; 
