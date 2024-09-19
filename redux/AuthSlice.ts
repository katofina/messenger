import getStringRef from "@/functions/firebase/getStringRef";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  nick: string;
  email: string;
  stringRef: string;
}

const initialState: AuthState = {
  nick: '',
  email: '',
  stringRef: '',
};

export const authState = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setNick: (state, action: PayloadAction<string>) => {
      state.nick = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.stringRef = getStringRef(action.payload);
    },
  },
});