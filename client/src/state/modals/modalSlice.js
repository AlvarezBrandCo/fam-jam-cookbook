import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "asdf",
};


export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showModal: (state, name) => {
      state.name = name.payload;
    },
    hideModal: (state) => {
      state.name = "";
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export const selectModal = (state) => {
  return state.modal.name;
  }

export default modalSlice.reducer;
