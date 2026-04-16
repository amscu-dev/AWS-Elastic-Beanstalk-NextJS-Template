import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modalType: "create" | "delete" | "edit" | null;
  channelId: number | null;
  isOpen: boolean;
}

const initialState: ModalState = {
  modalType: null,
  channelId: null,
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
      state.channelId = null;
    },
  },
  name: "modal",
  initialState,
});

export const { onCloseChannelModal, onOpenChannelModal } =
  modalStateSlice.actions;
export default modalStateSlice.reducer;
