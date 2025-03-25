import React, { useState } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemText, Avatar, TextField, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useFetch from '../../../hooks/useFetch';
import ChatWindow from './ChatWindow';
import './Chat.css'

const AllChats = ({ userId }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: conversations, loading, error } = useFetch(`/chat/conversations/${userId}`);

  const filteredConversations = (conversations || []).filter((c) => {
    if (!searchTerm) return true;
    const names = c.participants.map(p => p.firstName || '');
    return names.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load conversations</Typography>;

  return (
    <Grid container className="all-chats-container">
      <Grid item xs={3} className="all-chats-sidebar">
        <Box className="all-chats-search-header">
          <Typography variant="h6">Search chats</Typography>
          <Box className="all-chats-search-box">
            <TextField
              fullWidth
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className="all-chats-list-container">
          <List>
            {filteredConversations.map(conv => (
              <ListItem
                button
                key={conv._id}
                selected={selectedConversation?._id === conv._id}
                onClick={() => setSelectedConversation(conv)}
              >
                <Avatar className="all-chats-avatar">
                  {conv.participants.find(p => p.userId !== userId)?.firstName?.[0] || 'U'}
                </Avatar>
                <ListItemText
                  primary={conv.participants.find(p => p.userId !== userId)?.firstName || 'Conversation'}
                  secondary={conv.lastMessage || 'No messages yet'}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={9}>
        {selectedConversation ? (
          <ChatWindow conversation={selectedConversation} userId={userId} />
        ) : (
          <Box className="all-chats-empty-message">
            <Typography variant="h6">Select a conversation</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default AllChats;
