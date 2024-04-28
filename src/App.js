import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import FruitQualityTable from './FruitQualityTable';

function App() {
  return (
    <Container component="main" maxWidth="false" disableGutters style={{ height: '100vh', backgroundColor: '#b3e5fc' }}>
      <Paper elevation={3} style={{ margin: 'auto', padding: 4, maxWidth: '80%', marginTop: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Typography variant="h1" style={{ fontSize: '5.0rem', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>
            Fruit Quality
          </Typography>
          <FruitQualityTable />
        </div>
      </Paper>
    </Container>
  );
}

export default App;


