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
          user_uid: null,
          auth_uid: null,
          error: false,
          errorMessage: null
    };

    this.handlePreviousLogin();
  }

  // Previously logged in
  async handlePreviousLogin() {
    try {
      var user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');
      var auth_uid = await AsyncStorage.getItem('@GlucoseTracker:auth_uid');
      var email = await AsyncStorage.getItem('@GlucoseTracker:email');
      var password = await AsyncStorage.getItem('@GlucoseTracker:password');

      if(auth_uid != null && email != null && password != null && user_uid != null) {
        await firebase.auth()
          .signInWithEmailAndPassword(email, password);

        console.log("Already logged in", user_uid);

        // Navigate to the Home page
        return this.props.navigation.replace('MainTemplate', { user_uid: user_uid });
      }
    } catch(error) {
      console.log("Not already logged in");
    }
  }

  // Trying to log in
  async handleLogin() {

      try {
          await firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => {
              this.setState({ auth_uid: data.user.uid});
            });

          let users = firebase.firestore().collection('users');
          let query = await users.where('auth_id', '==', this.state.auth_uid).get()
            .then(snapshot => {
              var user_uids = []
              snapshot.forEach(doc => {
                user_uids.push(doc.id);
                // console.log(doc.auth_id, '=>', doc.data());
              });
              console.log(user_uids);
              this.setState({ user_uid: user_uids[0] });
            })

          console.log(this.state.user_uid);

          await AsyncStorage.setItem('@GlucoseTracker:user_uid', this.state.user_uid);
          await AsyncStorage.setItem('@GlucoseTracker:auth_uid', this.state.auth_uid);
          await AsyncStorage.setItem('@GlucoseTracker:email', this.state.email);
          await AsyncStorage.setItem('@GlucoseTracker:password', this.state.password);

          console.log("Logged In!", this.state.user_uid);

          // Navigate to the Home page
          return this.props.navigation.replace('MainTemplate', { user_uid: this.state.user_uid });
      } catch (error) {
          console.log(error);

          // Set error message
          return this.setState({
            error: true,
            errorMessage: error.toString()
          });
      }
  }

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
