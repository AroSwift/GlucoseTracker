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
    let before_after_options = [{
      value: 'Before',
    }, {
      value: 'After',
    }];

    let meal_options = [{
      value: 'Breakfast',
    }, {
      value: 'Lunch',
    }, {
      value: 'Dinner',
    }];

    return (
      <PaperProvider>
        <Surface style={styles.loginContainer}>
          <Dropdown
            label='Before / After'
            onChangeText={before_after => this.setState({ before_after })}
            data={before_after_options}
          />
          <Dropdown
            label='Breakfast / Lunch / Dinner'
            onChangeText={meal => this.setState({ meal })}
            data={meal_options}
          />
          <View style={styles.breakAfterDropdown}></View>
          <TextInput
            label='Blood Glucose Level'
            autoCapitalize="none"
            value={this.state.blood_glucose_level}
            onChangeText={blood_glucose_level => this.setState({ blood_glucose_level })}
            style={styles.breakAfter}
            error={this.state.error}
          />
          <Button mode="contained"
            onPress={() => this.handleAdd()}>
            Submit
          </Button>
        </Surface>
        <IconButton
                style={styles.circularButton}
                color={Colors.white}
                icon={require('../../assets/plus.png')}
                size={60}
                onPress={() => this.handleAdd()}>
        </IconButton>
      </PaperProvider>
    );
  }
}
