
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './components/Homepage/Homepage';
import ProjectsPage from './components/Projectspage/Projects';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectDetails from './components/Projectspage/ProjectDetails/ProjectDetails'
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
              <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
          </Box>
      </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
