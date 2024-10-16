import { createSlice } from "@reduxjs/toolkit";

export interface ChatMenuState {
  isOpenChatMenu: boolean;
  isOpenConfirmModule: boolean;
}

const initialState: ChatMenuState = {
  isOpenChatMenu: false,
  isOpenConfirmModule: false,
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
  },
});
