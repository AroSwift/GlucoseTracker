// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as firebase from "firebase";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  SignUp: {screen: SignUp},
  Nutrition: {screen: Nutrition},
});


// Open up the starting page: Login


import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Nutrition from './src/screens/Nutrition';


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
