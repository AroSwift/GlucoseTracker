// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';

//
// firebase.auth().signInWithCustomToken(token).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          errorMessage: null
    };
  }

  async handleLogin() {

      try {
          await firebase.auth()
              .signInWithEmailAndPassword(this.state.email, this.state.password);

          console.log("Logged In!");

          // Navigate to the Home page
          return this.props.navigation.replace('Nutrition');
          // navigate('SignUpScreen');

      } catch (error) {
          console.log(error.toString())
      }
  }

//    console.log(firebase.storage()); // also can do .firestore()

  render() {
    return (
      <PaperProvider>
        <Surface style={styles.loginContainer}>
          <Text style={styles.loginHeader}>Log In</Text>
          <TextInput
            label='Email'
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.breakAfter}
          />
          <TextInput
            label='Password'
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.breakAfter}
          />
          <Button
            title="Login"
             mode="contained"
             onPress={() => this.handleLogin()}
             style={styles.breakAfter}>
             Login
          </Button>
          <Button mode="contained"
             onPress={() => this.props.navigation.navigate('SignUp')}>
                Need an account? Sign Up.
          </Button>
        </Surface>
      </PaperProvider>
    );
  }
}
