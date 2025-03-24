import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './EditorCard.css'; // Import the CSS file

const EditorCard = ({ name, title, image }) => {
  return (
    <Card className="editorCard">
      <CardMedia
        component="img"
        image={image}
        alt={name}
        className="editorCardMedia"
      />
      <CardContent>
        <Box className="editorCardHeader">
          <Typography variant="subtitle1" className="editorCardName">
            {name}
          </Typography>
          <IconButton>
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" className="editorCardTitle">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EditorCard;
