// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
// Open up the starting page: Login


import Login from './src/screens/Login';



class App extends Component {
  render() {
    return (
      <PaperProvider>
        <Login/>
      </PaperProvider>
    )
  }
}

export default App;
