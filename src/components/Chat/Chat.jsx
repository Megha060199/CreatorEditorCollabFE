
import React, { useState } from 'react';
import { Paper, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useChat from '../../hooks/useChat';

const Chat = ({ open, onClose, conversationId, userId, rightOffset, name }) => {
  if (!open) return null;

  const [minimized, setMinimized] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const { messages, sendMessage } = useChat(conversationId, userId);

  const toggleMinimize = () => setMinimized((prev) => !prev);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: rightOffset || 16,
        width: 300,
        height: minimized ? '40px' : '400px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'height 0.3s ease',
        zIndex: 1000,
      }}
    >
      {/* Chat header with person's name */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1">{name || 'Chat'}</Typography>
        <Box>
          <IconButton size="small" onClick={toggleMinimize} sx={{ color: 'inherit' }}>
            {minimized ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <IconButton size="small" onClick={onClose} sx={{ color: 'inherit' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {!minimized && (
        <>
          <Box
            sx={{
              flexGrow: 1,
              p: 1,
              overflowY: 'auto',
              backgroundColor: 'background.default',
            }}
          >
            {messages && Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    color={msg.senderId === userId ? 'primary.main' : 'text.secondary'}
                  >
                    {msg.text}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No messages yet.
              </Typography>
            )}
          </Box>
          <Box sx={{ p: 1, borderTop: '1px solid #eee', display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Chat;
