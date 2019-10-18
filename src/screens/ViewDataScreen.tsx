// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';


export default class ViewDataScreen extends Component {

  constructor(props) {
    super(props);
    console.log('view_data_screen');
    console.log(props.route.navigation);
  }

  // Logout
  async handleLogOut() {
    try {
      await AsyncStorage.removeItem('@GlucoseTracker:auth_uid');
      await AsyncStorage.removeItem('@GlucoseTracker:email');
      await AsyncStorage.removeItem('@GlucoseTracker:password');

      return this.props.route.navigation.replace('Login');
    } catch (err) {
      console.log('errored');
      console.log(err);
    }
  }

  render() {
    return (
      <PaperProvider>
        <Surface style={styles.signupContainer}>
          <Button
            title="Logout"
            mode="contained"
            onPress={() => this.handleLogOut()}
            style={styles.breakAfter}>
            Logout
          </Button>
        </Surface>
      </PaperProvider>
    );
  }
}
