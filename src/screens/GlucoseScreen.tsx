// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, Colors, IconButton, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';

import AddGlucoseScreen from './AddGlucoseScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// TODO: add date picker after blood glucose level
export default class GlucoseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      before_after: '',
      meal: '',
      blood_glucose_level: '',
      error: false,
      errorMessage: null
    };
  }

  async handleAdd() {
    try {
      let exercise = firebase.firestore().collection('glucose').doc(); //.doc(this.make_id(20));
      exercise.set({
          before_after: this.state.before_after,
          meal: this.state.meal,
          blood_glucose_level: parseInt(this.state.blood_glucose_level),
          user_id: this.props.route.user_uid
      });

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <PaperProvider>
        <IconButton
                style={styles.circularButton}
                color={Colors.white}
                icon={require('../../assets/plus.png')}
                size={60}
                onPress={() => this.props.navigation.navigate('AddGlucose')}>
        </IconButton>
      </PaperProvider>
    );
  }
}
