import { configureStore } from "@reduxjs/toolkit";
import { ThemeState, themeState } from "./ThemeSlice";
import { authState, AuthState } from "./AuthSlice";

export interface Store {
  themeState: ThemeState;
  authState: AuthState;
};

export const store = configureStore({
  reducer: {
    themeState: themeState.reducer,
    authState: authState.reducer,
  },
});
