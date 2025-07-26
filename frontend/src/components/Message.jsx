import React from 'react';
import './Message.css'; // Optional: custom styling

const Message = ({ sender, content }) => {
  const isUser = sender === 'user';
  return (
    <div className={`message ${isUser ? 'user-message' : 'ai-message'}`}>
      <span>{content}</span>
    </div>
  );
};

export default Message;
