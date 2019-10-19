// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';


export default class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          errorMessage: null
    };


  }


  async handleSignUp(email, pass) {

      try {
          await firebase.auth()
              .createUserWithEmailAndPassword(email, pass);

          console.log("Account created");

          // Navigate to the Home page, the user is auto logged in

      } catch (error) {
          console.log(error.toString())
      }

  }



render() {
    return (
      <PaperProvider>
        <Surface style={styles.signupContainer}>
          <Text style={styles.loginHeader}>Sign Up</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            style={styles.breakAfter}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            style={styles.breakAfter}
          />
          <Button
            title="Login"
            mode="contained"
            onPress={this.handleSignUp}
            style={styles.breakAfter}>
            Sign Up
          </Button>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('Login')}>
                Already have an account? Login.
          </Button>
        </Surface>
      </PaperProvider>
    )
  }
}
