import { configureStore } from '@reduxjs/toolkit';
import modalsReducer from './state/modals/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalsReducer
  },
});


