import { configureStore } from '@reduxjs/toolkit';
import sidenavbarReducer from "../redux/slices/sideNavBar/index"

export const store = configureStore({
  reducer: {
    sidenavbar: sidenavbarReducer,
  },
});
