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


export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      address : '',
      error: false,
      errorMessage: null
    };
  }y

  // Logout
  async handleLogOut() {
    try {
      await AsyncStorage.removeItem('@GlucoseTracker:auth_uid');
      await AsyncStorage.removeItem('@GlucoseTracker:email');
      await AsyncStorage.removeItem('@GlucoseTracker:password');

      return this.props.route.navigation.replace('Login');
    } catch (err) {
      console.log(err);
    }
  }


  async handleChangeSettings()
  {


try {

     var auth_uid = await AsyncStorage.getItem('@GlucoseTracker:auth_uid');
     var user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');

     let updateValues = firebase.firestore().collection('users').doc(user_uid); //.doc(this.make_id(20));
      updateValues.update({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          address: this.state.address,
      });

      console.log('Got Here');

    } catch (err) {
      console.log(err);
      console.log('Got here and died');
    }

  }


  render() {
    return (
      <PaperProvider>
        <Surface style={styles.signupContainer}>


        <TextInput
          label='First Name'
          autoCapitalize="none"
          value={this.state.first_name}
          onChangeText={first_name => this.setState({ first_name })}
          style={styles.breakAfter}
          error={this.state.error}
        />

        <TextInput
          label='Last Name'
          autoCapitalize="none"
          value={this.state.last_name}
          onChangeText={last_name => this.setState({ last_name })}
          style={styles.breakAfter}
          error={this.state.error}
        />

        <TextInput
          label='Address'
          autoCapitalize="none"
          value={this.state.address}
          onChangeText={address => this.setState({ address })}
          style={styles.breakAfter}
          error={this.state.error}
        />

        <Button mode="contained"
          onPress={() => this.handleChangeSettings()}
          style={styles.breakAfter}>
          Submit
        </Button>


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
