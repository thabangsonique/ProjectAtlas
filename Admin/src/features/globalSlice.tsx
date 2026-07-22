import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
  sidebarCollapsed: boolean;
  darkMode: boolean;
}

const initialState: initialStateTypes = {
  sidebarCollapsed: false,
  darkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    //menu collapsed
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },

    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setSidebarCollapsed, setDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
