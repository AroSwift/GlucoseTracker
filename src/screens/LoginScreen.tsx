// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';


export default class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
          email: '',
          password: '',
          auth_uid: null,
          error: false,
          errorMessage: null
    };

    // this.handlePreviousLogin = this.handlePreviousLogin.bind(this);
    // this.handleLogin = this.handleLogin.bind(this);

    this.handlePreviousLogin();
  }

  // Previously logged in
  async handlePreviousLogin() {
    try {
      var uid = await AsyncStorage.getItem('@GlucoseTracker:auth_uid');
      var email = await AsyncStorage.getItem('@GlucoseTracker:email');
      var password = await AsyncStorage.getItem('@GlucoseTracker:password');

      console.log(email);

      await firebase.auth()
          .signInWithEmailAndPassword(email, password);

      console.log("Already logged in");

      // Navigate to the Home page
      return this.props.navigation.replace('MainTemplate'); // .replace
    } catch(error) {
      console.log("Not already logged in");
    }
  }

  // Trying to log in
  async handleLogin() {

      try {
        var uid = '';
          await firebase.auth()
              .signInWithEmailAndPassword(this.state.email, this.state.password)
              .then(data => {
                this.setState({ auth_uid: uid});
              });

          await AsyncStorage.setItem('@GlucoseTracker:auth_uid', this.state.auth_uid);
          await AsyncStorage.setItem('@GlucoseTracker:email', this.state.email);
          await AsyncStorage.setItem('@GlucoseTracker:password', this.state.password);


          console.log(this.state.auth_uid)

          console.log("Logged In!");

          // Navigate to the Home page
          return this.props.navigation.replace('MainTemplate'); // .replace
      } catch (error) {
          console.log(error);

          // Set error message
          return this.setState({
            error: true,
            errorMessage: error.toString()
          });
      }
  }

//    console.log(firebase.storage()); // also can do .firestore()

  render() {
    return (
      <PaperProvider>
        <Surface style={styles.loginContainer}>
          <Text style={styles.loginHeader}>Log In</Text>
          { this.state.errorMessage != null &&
            <Text style={styles.mainError}>{this.state.errorMessage}</Text>
          }
          <TextInput
            label='Email'
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.breakAfter}
            error={this.state.error}
          />
          <TextInput
            label='Password'
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.breakAfter}
            error={this.state.error}
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
