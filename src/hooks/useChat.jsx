import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import useFetch from '../hooks/useFetch';

const useChat = (conversationId, userId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  const { data, loading, error } = useFetch(
    conversationId ? `/chat/messages/${conversationId}` : null
  );

  useEffect(() => {
    if (data) {

      setMessages(Array.isArray(data) ? data : []);
    }
  }, [data]);

  useEffect(() => {
    console.log(conversationId,'check')
    if (!conversationId) return;

    const socketUrl = `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_PORT}`;
    console.log(socketUrl,'chekck')
    socketRef.current = io(socketUrl);

    socketRef.current.emit('joinConversation', conversationId);

    socketRef.current.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.emit('leaveConversation', conversationId);
      socketRef.current.disconnect();
    };
  }, [conversationId]);

  const sendMessage = (text, attachments = []) => {
    if (!socketRef.current) {
      console.error("Socket not connected yet.");
      return;
    }
    if (text.trim()) {
      const messageData = {
        conversationId,
        senderId: userId,
        text,
        attachments,
      };
      socketRef.current.emit('sendMessage', messageData);
    }
  };

  return { messages, sendMessage, loading, error };
};

export default useChat;
