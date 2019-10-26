import * as React from 'react';
import { Button } from 'react-native-paper';
import './App.css';

function App() {
  return (
    <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
  );
}

export default App;
