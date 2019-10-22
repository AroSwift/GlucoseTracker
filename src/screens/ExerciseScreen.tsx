// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  IconButton, Colors, Button, TextInput, Text, Surface, Card, Provider as PaperProvider
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

    async handleAdd() {
      try {
        console.log(this.state.exercise_type);
        console.log(this.state.exercise_duration);
        console.log("the route;",this.props.route.user_uid);

        let exercise = firebase.firestore().collection('exercise').doc(); //.doc(this.make_id(20));
        exercise.set({
            duration: parseInt(this.state.exercise_duration),
            type: this.state.exercise_type,
            user_id: this.props.route.user_uid
        });

      } catch (err) {
        console.log(err);
      }
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
          <Surface style={styles.contentContainer}>

          <Text style={styles.generalHeader}>Add Exercise</Text>
          { this.state.errorMessage != null &&
            <Text style={styles.mainError}>{this.state.errorMessage}</Text>
          }


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
                  color={Colors.white}
                  icon={require('../../assets/plus.png')}
                  size={60}
                  onPress={() => this.handleAdd()}>
          </IconButton>
        </PaperProvider>
      );
    }
  }
