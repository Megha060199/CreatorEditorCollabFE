// components/Header.js
import React from 'react';
import { Box, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css'
import { CircularProgress } from '@mui/material';
const Header = ({ onSearch,loading }) => (
  <Box className="searchContainer">
  <Typography variant="h4" className="searchTitle">Find an Editor</Typography>
  <TextField
    fullWidth
    placeholder="Search for editors or skills..."
    onChange={e => onSearch(e.target.value)}
    disabled={loading}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
      endAdornment: loading && (
        <InputAdornment position="end">
          <CircularProgress size={20} />
        </InputAdornment>
      )
    }}
    className="searchInputField"
  />
</Box>
);


export default Header;
