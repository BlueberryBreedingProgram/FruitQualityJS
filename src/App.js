import React, { useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import FruitQualityTable from './FruitQualityTable';
import YieldComponent from './YieldComponent'; // Step 1: Import the YieldComponent

function App() {
  // Step 2: State to determine which component to show
  const [showYieldComponent, setShowYieldComponent] = useState(false);

  // Step 3: Toggle mechanism to switch between views
  const toggleView = () => {
    setShowYieldComponent(!showYieldComponent);
  };

  return (
    <Container component="main" maxWidth="false" disableGutters style={{ height: '100vh', backgroundColor: '#b3e5fc' }}>
      <Paper elevation={3} style={{ margin: 'auto', padding: 4, maxWidth: '80%', marginTop: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Typography variant="h1" style={{ fontSize: '5.0rem', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>
            Fruit Quality
          </Typography>
          <Button variant="text" color="primary" onClick={toggleView}>
            {showYieldComponent ? 'Show Fruit Quality Table' : 'Show Yield By Week'}
          </Button>
          {/* Step 4: Conditionally render the components */}
          {showYieldComponent ? <YieldComponent /> : <FruitQualityTable />}
          {/* Toggle button */}
        </div>
      </Paper>
    </Container>
  );
}

export default App;



