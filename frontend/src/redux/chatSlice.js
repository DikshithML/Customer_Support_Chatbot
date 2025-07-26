// redux/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  input: '',
  loading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    resetInput: (state) => {
      state.input = '';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setInput, resetInput, setLoading, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
