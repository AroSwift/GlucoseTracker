// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
// Get all the stylesheets
import { styles } from '../stylesheets/Main.js';

//import db from 'firebase';
import { firebase } from '../config';

// TODO: once logged in, redirect to nutrition page


//
// firebase.auth().signInWithCustomToken(token).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });
//
//


export default class Login extends Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin() {
    console.log(firebase.storage()); // also can do .firestore()
  }


  render() {
    return (
      <Surface style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Sign In</Text>
        <TextInput
          label='Email'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.breakAfter}
        />
        <TextInput
          label='Password'
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          style={styles.breakAfter}
        />
        <Button mode="contained" onPress={this.handleLogin}>
          Login
        </Button>
      </Surface>
    );
  }
}

// <Button
//   title="Don't have an account? Sign Up"
//   onPress={() => this.props.navigation.navigate('SignUp')}
// />
