import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const SideNavBarSlice = createSlice({
  name: 'sidenavbar',
  initialState,
  reducers: {
    navbarOpenState: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const {navbarOpenState} = SideNavBarSlice.actions;
export default SideNavBarSlice.reducer;
