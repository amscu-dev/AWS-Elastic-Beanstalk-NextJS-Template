import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modalType: undefined | "create" | "delete" | "edit";
  channelId: undefined | number;
  isOpen: boolean;
}

const initialState: ModalState = {
  modalType: undefined,
  channelId: undefined,
  isOpen: false,
};

export const modalStateSlice = createSlice({
  reducers: {
    onOpenChannelModal: (
      state,
      action: PayloadAction<{
        channelId: number;
      }>,
    ) => {
      state.isOpen = true;
      state.channelId = action.payload.channelId;
    },
    onCloseChannelModal: (state) => {
      state.isOpen = false;
      state.channelId = undefined;
    },
  },
  name: "modal",
  initialState,
});

export const { onCloseChannelModal, onOpenChannelModal } =
  modalStateSlice.actions;
export default modalStateSlice.reducer;
