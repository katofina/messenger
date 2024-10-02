import { configureStore } from "@reduxjs/toolkit";
import { ThemeState, themeState } from "./ThemeSlice";
import { authState, AuthState } from "./AuthSlice";
import { langState, LangState } from "./LanguageSlice";
import { chatMenuState, ChatMenuState } from "./ChatMenuSlice";

export interface Store {
  themeState: ThemeState;
  authState: AuthState;
  langState: LangState;
  chatMenuState: ChatMenuState;
}

export const store = configureStore({
  reducer: {
    themeState: themeState.reducer,
    authState: authState.reducer,
    langState: langState.reducer,
    chatMenuState: chatMenuState.reducer,
  },
});
