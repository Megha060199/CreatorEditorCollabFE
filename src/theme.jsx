// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1',  // A professional dark blue
    },
    secondary: {
      main: '#FFC107',  // A contrasting accent color
    },
    background: {
      default: '#ffff', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: 16,
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
