import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsersStart(state, actions) {
      state.user = actions.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { setUsersStart} = userSlice.actions;

export default userSlice.reducer;
