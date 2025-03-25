
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './components/Homepage/Homepage';
import ProjectsPage from './components/Projectspage/Projects';
import AllChats from './components/Chat/ChatRoute/AllConversations'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      
      <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/chats" element={<AllChats userId={"1001"} />} />
              
            </Routes>
          </Box>
      </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
