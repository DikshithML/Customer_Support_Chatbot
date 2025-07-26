import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInput,
  addMessage,
  setLoading,
  resetInput
} from '../redux/chatSlice';
import { sendMessageToBackend } from '../utils/chatService';

const UserInput = () => {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.chat.input);
  const loading = useSelector((state) => state.chat.loading);
  const conversationId = useSelector((state) => state.chat.activeConversationId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add user's message to Redux
    dispatch(addMessage({ sender: 'user', text: trimmedInput }));

    // Start loading and reset input
    dispatch(setLoading(true));
    dispatch(resetInput());

    try {
      // Send message to backend
      const response = await sendMessageToBackend(trimmedInput, conversationId);

      // Handle backend response
      const botReply = response?.reply || 'Sorry, I didn’t understand that.';
      dispatch(addMessage({ sender: 'bot', text: botReply }));
    } catch (error) {
      console.error('Error communicating with backend:', error);
      dispatch(addMessage({ sender: 'bot', text: 'Something went wrong. Please try again later.' }));
    }

    // Stop loading
    dispatch(setLoading(false));
  };

  return (
    <form className="user-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button type="submit" disabled={loading || !input.trim()}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default UserInput;
