// components/ChatWindow.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const ChatWindow = () => {
  const { conversations, activeConversationId, loading } = useSelector((state) => state.chat);
  const messages = conversations[activeConversationId] || [];

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Thinking...</div>}
      </div>
    </div>
  );
};

export default ChatWindow;
