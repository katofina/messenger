import { ThemeString } from "@/constants/theme/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: ThemeString;
}

const initialState: ThemeState = {
  theme: 'system',
};

export const themeState = createSlice({
  name: "themeState",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeString>) => {
      state.theme = action.payload;
    },
  },
});
