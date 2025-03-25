
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import client from '../../../api/client';
import './Chat.css';

const ChatWindow = ({ conversation, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const bottomRef = useRef(null);

  const { data, loading, error } = useFetch(
    conversation? `/chat/messages/${conversation._id}` : null
  );

  useEffect(() => {
    if (Array.isArray(data)) setMessages(data);
  }, [data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;
    try {
      const res = await client.post('/chat/messages', {
        conversationId: conversation._id,
        senderId: userId,
        text: newMsg,
        attachments: []
      });
      setMessages(prev => [...prev, res.data]);
      setNewMsg('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) {
    return (
      <Box className="chat-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="chat-container">
        <Typography color="error">Failed to load messages.</Typography>
      </Box>
    );
  }

  return (
    <Box className="chat-container">
      <Box className="chat-header">
        <Typography variant="h6">
          {conversation.participants?.find(p => p.userId !== userId)?.firstName}
        </Typography>
      </Box>

      <Box className="chat-message-list">
        {messages.map(msg => {
          const isMe = msg.senderId === userId;
          return (
            <Box
              key={msg._id}
              className={`chat-message-wrapper ${isMe ? 'align-right' : 'align-left'}`}
            >
              <Box className="chat-message-box">
                <Typography variant="body2" className="chat-message-text">
                  {msg.text}
                </Typography>
                <Typography variant="caption" className="chat-message-time">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={bottomRef} />
      </Box>

      <Box className="chat-footer">
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleSend())}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
