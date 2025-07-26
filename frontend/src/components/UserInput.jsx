import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInput,
  addMessage,
  setLoading,
  resetInput
} from '../redux/chatSlice';

const UserInput = () => {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.chat.input);
  const loading = useSelector((state) => state.chat.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add user's message
    dispatch(addMessage({ sender: 'user', text: trimmedInput }));

    // Show loading state and reset input
    dispatch(setLoading(true));
    dispatch(resetInput());

    // Simulate bot response
    setTimeout(() => {
      dispatch(addMessage({ sender: 'bot', text: `Response to "${trimmedInput}"` }));
      dispatch(setLoading(false));
    }, 1000);
  };

  return (
    <form className="user-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        placeholder="Type your message..."
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default UserInput;
