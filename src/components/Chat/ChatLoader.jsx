import React from 'react';
import useFetch from '../../hooks/useFetch';
import Chat from './Chat';

const ChatLoader = ({ conversationId, userId, name, rightOffset, onClose }) => {
  const { data, loading, error } = useFetch(conversationId ? `/chat/messages/${conversationId}` : null);

  if (loading) return <div style={{ position:'fixed', bottom:16, right:rightOffset }}>Loading…</div>;
  if (error) return <div style={{ position:'fixed', bottom:16, right:rightOffset }}>Error loading chat</div>;
  if (!data?._id && !Array.isArray(data)) return null;

  return (
    <Chat
      open
      onClose={onClose}
      conversationId={conversationId}
      userId={userId}
      name={name}
      rightOffset={rightOffset}
    />
  );
};

export default ChatLoader;
