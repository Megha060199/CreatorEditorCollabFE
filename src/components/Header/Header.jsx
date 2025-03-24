// components/Header.js
import React from 'react';
import { Box, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css'
const Header = () => {
  return (
    <Box component="main" className="searchContainer">
      <Typography variant="h4" className="searchTitle">
        Find an Editor
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Search for editors or skills..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="searchIcon" />
            </InputAdornment>
          ),
        }}
        className="searchInputField"
      />
    </Box>
  );
};

export default Header;
