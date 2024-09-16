import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  nick: string;
}

const initialState: AuthState = {
  nick: '',
};

export const authState = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setNick: (state, action: PayloadAction<string>) => {
      state.nick = action.payload;
    },
  },
});