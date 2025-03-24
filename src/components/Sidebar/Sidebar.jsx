import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import './Sidebar.css';



const navItems = [
  { text: 'Editor Listings', icon: <EditIcon />, route: '/' },
  { text: 'Chats', icon: <ChatBubbleOutlineIcon />, route: '/chats' },
  { text: 'Projects', icon: <WorkIcon />, route: '/projects' },
  { text: 'Profile', icon: <PersonIcon />, route: '/profile' },
  { text: 'Settings', icon: <SettingsIcon />, route: '/settings' },
];

const Sidebar = () => (
  <Drawer
    variant="permanent"
    className="sidebar"
    classes={{ paper: 'sidebar-paper' }}
  >
    <Toolbar className="sidebar-toolbar">
      <Typography variant="h6" component="div" className="sidebar-title">
        CollabConnect
      </Typography>
    </Toolbar>
    <Box className="sidebar-list-container">
      <List>
        {navItems.map(item => (
          <ListItem button component={Link} key={item.text} to={item.route} className="sidebar-list-item">
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
);

export default Sidebar;