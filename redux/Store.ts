import { configureStore } from "@reduxjs/toolkit";
import { ThemeState, themeState } from "./ThemeSlice";

export interface Store {
  themeState: ThemeState;
}

export const store = configureStore({
  reducer: {
    themeState: themeState.reducer,
  },
});
