
import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatLoader from '../../Chat/ChatLoader'
import './EditorList.css';

const EditorList = ({ editors, userId }) => {
  const [openChats, setOpenChats] = useState([]);

  const handleChatOpen = (editor) => {
    const endpoint = `/chat/conversation/${userId}/${editor.id}`;
    if (!openChats.some((chat) => chat.endpoint === endpoint)) {
      setOpenChats((prev) => [...prev, { endpoint, editor }]);
    }
  };

  const handleChatClose = (endpointToClose) => {
    setOpenChats((prev) => prev.filter((chat) => chat.endpoint !== endpointToClose));
  };

  return (
    <>
      <List>
        {editors.map((editor) => {
          let [id, firstName, lastName, email, gender, specilization, city, state, country, avatar_index, avatar, category] = editor;
          id = Number(id);
          return (
            <ListItem key={id} className="editorListItem">
              <div className="editorListItemContent">
                <ListItemAvatar>
                  <Avatar alt={firstName} src={avatar} />
                </ListItemAvatar>
                <ListItemText primary={`${firstName} ${lastName}`} secondary={specilization} />
              </div>
              <IconButton onClick={() => handleChatOpen({ id, firstName, lastName })}>
                <ChatBubbleOutlineIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      {openChats.map((chat, index) => (
        <ChatLoader 
          key={chat.endpoint}
          conversationEndpoint={chat.endpoint}
          userId={userId}
          rightOffset={16 + index * (300 + 16)}
          onClose={() => handleChatClose(chat.endpoint)}
          name={`${chat.editor.firstName} ${chat.editor.lastName}`}
        />
      ))}
    </>
  );
};

export default EditorList;
