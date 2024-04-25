import React from 'react';
import { CssBaseline, Typography, Paper, Box, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FruitQualityTable from './FruitQualityTable';

const theme = createTheme({
  palette: {
    background: {
      default: '#b3e5fc'  // Light blue background color
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Poppins as the primary font
    h1: {
      fontSize: '6rem', // Larger font size
      fontWeight: 0, // Extra bold
      textAlign: 'center',
      letterSpacing: '0.1rem', // Add some letter spacing
      textTransform: 'uppercase' // Capitalize letters for more impact
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize the styling across browsers and apply background color */}
      <Container component="main" maxWidth="false" disableGutters style={{ height: '100vh', backgroundColor: theme.palette.background.default }}>
        <Paper elevation={3} sx={{ margin: 'auto', padding: 4, maxWidth: '80%', marginTop: 8 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
            }}
          >
            <Typography variant="h1" gutterBottom style={{ fontSize: '5.0rem' }}>
              Test Data
            </Typography>
            <div>
              <FruitQualityTable />
            </div>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;

