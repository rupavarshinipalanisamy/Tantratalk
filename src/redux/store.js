import { configureStore } from '@reduxjs/toolkit';
import sidenavbarReducer from "../redux/slices/sideNavBar/index"
import { authApi } from './services/auth/authSlice';
import authReducer from './slices/authStateSice/index'
import { backendApi } from './services/api/backendapi';

export const store = configureStore({
  reducer: {
    sidenavbar: sidenavbarReducer,
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware,backendApi.middleware),
});
