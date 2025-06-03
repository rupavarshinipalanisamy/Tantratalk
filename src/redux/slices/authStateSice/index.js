import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isLoggedIn: false,
  userToken: null,
};

// Create a slice for auth
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userToken = action.payload.token; // Save token after login
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userToken = null; // Remove token after logout
    },
  },
});

// Export actions for dispatching
export const { login, logout } = authSlice.actions;

// Export reducer to use in store
export default authSlice.reducer;
