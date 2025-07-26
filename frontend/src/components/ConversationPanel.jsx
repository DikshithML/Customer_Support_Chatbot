// src/components/ConversationPanel.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadConversation } from '../redux/chatSlice';

const ConversationPanel = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const currentId = useSelector((state) => state.chat.activeConversationId);

  const handleSelect = (id) => {
    dispatch(loadConversation(id));
  };

  return (
    <div className="conversation-panel">
      <h3>Conversations</h3>
      <ul>
        {Object.keys(conversations).map((id) => (
          <li
            key={id}
            className={id === currentId ? 'active' : ''}
            onClick={() => handleSelect(id)}
          >
            {`Session ${id.slice(-4)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationPanel;
