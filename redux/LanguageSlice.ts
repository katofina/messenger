import { LanguageString } from "@/constants/language/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LangState {
  lang: LanguageString;
}

const initialState: LangState = {
  lang: 'english',
};

export const langState = createSlice({
  name: "langState",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<LanguageString>) => {
      state.lang = action.payload;
    },
  },
});