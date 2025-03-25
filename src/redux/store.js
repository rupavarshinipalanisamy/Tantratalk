import { configureStore } from '@reduxjs/toolkit';
import sidenavbarReducer from "../redux/slices/sideNavBar/index"
import { authApi } from './services/auth/authSlice';

export const store = configureStore({
  reducer: {
    sidenavbar: sidenavbarReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
