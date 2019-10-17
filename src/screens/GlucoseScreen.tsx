// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';


export default class GlucoseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
          blood_glucose_level: '',
          error: false,
          errorMessage: null
    };
  }

  render() {
    let before_after = [{
      value: 'Before',
    }, {
      value: 'After',
    }];

    let meal = [{
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
            data={before_after}
          />
          <Dropdown
            label='Breakfast / Lunch / Dinner'
            data={meal}
            style={styles.breakAfter}
          />
          <TextInput
            label='Blood Glucose Level'
            autoCapitalize="none"
            value={this.state.blood_glucose_level}
            onChangeText={blood_glucose_level => this.setState({ blood_glucose_level })}
            style={styles.breakAfter}
            error={this.state.error}
          />
          <Button mode="contained"
             onPress={() => this.props.navigation.navigate('Glucose')}>
                Submit
          </Button>
        </Surface>
      </PaperProvider>
    );
  }
}
