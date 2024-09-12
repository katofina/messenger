import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: null | string;
}

const initialState: ThemeState = {
  theme: null,
};

export const themeState = createSlice({
  name: "themeState",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});
