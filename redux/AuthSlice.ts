import getStringRef from "@/functions/firebase/getStringRef";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  nick: string;
  email: string;
  stringRef: string;
  photoURL: string;
};

const initialState: AuthState = {
  nick: '',
  email: '',
  stringRef: '',
  photoURL: '',
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
    setPhoto: (state, action: PayloadAction<string>) => {
      state.photoURL = action.payload;
    },
    deleteUserData: (state) => {
      state.nick = "";
      state.email = "";
      state.photoURL = "";
      state.stringRef = "";
    },
  },
});