import { createSlice } from "@reduxjs/toolkit";

export interface ChatMenuState {
  isOpen: boolean;
  isOpenModule: boolean;
}

const initialState: ChatMenuState = {
  isOpen: false,
  isOpenModule: false,
};

export const chatMenuState = createSlice({
  name: "chatMenuState",
  initialState,
  reducers: {
    openChatMenu: (state) => {
      state.isOpen = true;
    },
    closeChatMenu: (state) => {
      state.isOpen = false;
    },
    openModule: (state) => {
      state.isOpenModule = true;
    },
    closeModule: (state) => {
      state.isOpenModule = false;
    },
  },
});
