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

export default class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          user_uid: null,
          auth_id: null,
          errorMessage: null
        };
    }


  async handleSignUp() {

      try {
          await firebase.auth()
              .createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then(data => {
                this.setState({ auth_id: data.user.uid});
              });

          // Create UID and save to Firebase
          let users = firebase.firestore().collection('users').doc()
            .set({
                  admin: false,
                  auth_id: this.state.auth_id,
                  first_name: '',
                  last_name: ''
                })


          console.log("Account created");
          console.log(this.state.auth_id);

          //Set user uid
          let query = await users.where('auth_id', '==', this.state.auth_id).get()
            .then(snapshot => {
              var user_uids = []
              snapshot.forEach(doc => {
                user_uids.push(doc.id);
              });
              console.log(user_uids);
              this.setState({ user_uid: user_uids[0] });
            })

          await AsyncStorage.setItem('@GlucoseTracker:user_uid', this.state.user_uid);
          await AsyncStorage.setItem('@GlucoseTracker:auth_id', this.state.auth_id);
          await AsyncStorage.setItem('@GlucoseTracker:email', this.state.email);
          await AsyncStorage.setItem('@GlucoseTracker:password', this.state.password);

          console.log("Logged In!", this.state.user_uid);

          try {
            var user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');
            var auth_id = await AsyncStorage.getItem('@GlucoseTracker:auth_id');
            var email = await AsyncStorage.getItem('@GlucoseTracker:email');
            var password = await AsyncStorage.getItem('@GlucoseTracker:password');

            if(auth_id != null && email != null && password != null && user_uid != null) {
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
      catch (error) {
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
            onPress={() => this.handleSignUp()}
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
