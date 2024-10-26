import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ChatMenuState {
  isOpenChatMenu: boolean;
  isOpenConfirmModule: boolean;
  email: null | string;
}

const initialState: ChatMenuState = {
  isOpenChatMenu: false,
  isOpenConfirmModule: false,
  email: null,
};

export const chatMenuState = createSlice({
  name: "chatMenuState",
  initialState,
  reducers: {
    openChatMenu: (state) => {
      state.isOpenChatMenu = true;
    },
    closeChatMenu: (state) => {
      state.isOpenChatMenu = false;
    },
    openConfirmModule: (state) => {
      state.isOpenConfirmModule = true;
    },
    closeConfirmModule: (state) => {
      state.isOpenConfirmModule = false;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});
