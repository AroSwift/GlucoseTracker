// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  IconButton, Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';


export default class ExerciseScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
        exercise_type: '',
        exercise_duration: '',
        error: false,
        errorMessage: null
      };
    }

    handleAdd() {
      console.log(this.state.exercise_type);
      console.log(this.state.meal);
      console.log(this.state.exercise_duration);
    }

    render() {
      let exercise_type_options = [{
        value: 'Running',
      }, {
        value: 'Boxing',
      }, {
        value: 'Walking',
      }, {
        value: 'Eliptical',
      }];

      return (
        <PaperProvider>
          <Surface style={styles.loginContainer}>
            <Dropdown
              label='Exercise Type'
              onChangeText={exercise_type => this.setState({ exercise_type })}
              data={exercise_type_options}
            />
            <View style={styles.breakAfterDropdown}></View>
            <TextInput
              label='Exercise Duration (minutes)'
              autoCapitalize="none"
              value={this.state.exercise_duration}
              onChangeText={exercise_duration => this.setState({ exercise_duration })}
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
                  icon={require('../../assets/plus.png')}
                  size={60}
                  onPress={() => this.handleAdd()}>

          </IconButton>
        </PaperProvider>
      );
    }
  }
