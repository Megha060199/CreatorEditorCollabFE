// src/components/ChatLoader.jsx
import React from 'react';
import useFetch from '../../hooks/useFetch';
import Chat from './Chat';

const ChatLoader = ({ conversationEndpoint, userId, rightOffset, onClose, name }) => {
  const { data, loading, error } = useFetch(conversationEndpoint);

  if (loading) {
    return (
      <div style={{ position: 'fixed', bottom: 16, right: rightOffset, zIndex: 1000 }}>
        Loading chat...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ position: 'fixed', bottom: 16, right: rightOffset, zIndex: 1000 }}>
        Error loading chat.
      </div>
    );
  }

  const conversationId = data && data._id;
  if (!conversationId) return null;

  return (
    <Chat 
      open={true}
      onClose={onClose}
      conversationId={conversationId}
      userId={userId}
      rightOffset={rightOffset}
      name={name}
    />
  );
};

export default ChatLoader;
