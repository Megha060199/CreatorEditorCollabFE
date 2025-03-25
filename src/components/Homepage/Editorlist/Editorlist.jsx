// src/components/EditorList.jsx
import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatLoader from '../../Chat/ChatLoader';
import usePost from '../../../hooks/usePost';
import './EditorList.css';

const EditorList = ({ editors, userId, currentUser }) => {
  const [openChats, setOpenChats] = useState([]);
  const { data: conversationData, loading, error, post: createConversation } = usePost('/chat/conversation');

  const handleChatOpen = async (editor) => {
    const participants = [
      { userId, firstName: "Megha", lastName: "Chandwani", avatar: '' },
      { userId: editor.id, firstName: editor.firstName, lastName: editor.lastName, avatar: editor.avatar }
    ];

    try {
      const convo = await createConversation({ participants });
      if (!openChats.some(chat => chat.conversationId === convo._id)) {
        setOpenChats(prev => [...prev, { conversationId: convo._id, editor }]);
      }
    } catch {
      console.error('Failed to open conversation');
    }
  };

  const handleChatClose = (conversationId) => {
    setOpenChats(prev => prev.filter(chat => chat.conversationId !== conversationId));
  };

  return (
    <>
      <List>
        {editors.map((editor) => {
          let [id, firstName, lastName,,,specilization,,,,, avatar] = editor;
          id = Number(id);
          return (
            <ListItem key={id} className="editorListItem">
              <ListItemAvatar>
                <Avatar alt={firstName} src={avatar} />
              </ListItemAvatar>
              <ListItemText primary={`${firstName} ${lastName}`} secondary={specilization}  />
             
              <IconButton onClick={() => handleChatOpen({ id, firstName, lastName, avatar })}>
                <ChatBubbleOutlineIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>

      {loading && <div>Opening chat…</div>}
      {error && <div>Error opening chat</div>}

      {openChats.map((chat, idx) => (
        <ChatLoader
          key={chat.conversationId}
          conversationId={chat.conversationId}
          userId={userId}
          name={`${chat.editor.firstName} ${chat.editor.lastName}`}
          rightOffset={16 + idx * (300 + 16)}
          onClose={() => handleChatClose(chat.conversationId)}
        />
      ))}
    </>
  );
};

export default EditorList;
