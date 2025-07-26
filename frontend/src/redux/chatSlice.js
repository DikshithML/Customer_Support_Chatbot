// redux/chatSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialConversationId = nanoid();

const initialState = {
  conversations: {
    [initialConversationId]: [],
  },
  activeConversationId: initialConversationId,
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
      const id = state.activeConversationId;
      if (!state.conversations[id]) {
        state.conversations[id] = [];
      }
      state.conversations[id].push(action.payload);
    },
    loadConversation: (state, action) => {
      const id = action.payload;
      state.activeConversationId = id;
      // Create if doesn't exist
      if (!state.conversations[id]) {
        state.conversations[id] = [];
      }
    },
    startNewConversation: (state) => {
      const newId = nanoid();
      state.conversations[newId] = [];
      state.activeConversationId = newId;
    },
  },
});

export const {
  setInput,
  resetInput,
  setLoading,
  addMessage,
  loadConversation,
  startNewConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
