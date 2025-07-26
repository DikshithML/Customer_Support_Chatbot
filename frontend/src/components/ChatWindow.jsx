import React, { useState } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (newMessage) => {
    setMessages(prev => [...prev, { sender: 'user', content: newMessage }]);

    // Placeholder for AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', content: `AI Response to: ${newMessage}` }]);
    }, 500);
  };

  return (
    <div className="chat-window">
      <h2>Support Chat</h2>
      <MessageList messages={messages} />
      <UserInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
