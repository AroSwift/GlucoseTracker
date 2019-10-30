import * as React from 'react';
import { View } from 'react-native';
import {
  Button, Colors, IconButton, TextInput, Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import './stylesheets/Main.css';
//import db from 'firebase';
// import * as firebase from "firebase";
import { firebase } from './config.js';

// TODO: add date picker after blood glucose level
export default class GlucoseScreen extends React.Component {

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
        <Surface className="glucoseContainer">

        <Text className="glucoseHeader">Add Glucose</Text>
        { this.state.errorMessage != null &&
          <Text>{this.state.errorMessage}</Text>
        }
        <div className="smallBreakAfter"></div>

          <InputLabel id="label">Before / After</InputLabel>
          <Select labelId="label" id="select" value="Before">
            <MenuItem value="Before">Before</MenuItem>
            <MenuItem value="After">After</MenuItem>
          </Select>
          <div className="breakAfter"></div>

          <InputLabel id="label">Breakfast / Lunch / Dinner</InputLabel>
          <Select labelId="label" id="select" value="Breakfast">
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
          </Select>
          <div className="breakAfter"></div>

          <View></View>
          <TextInput
            label='Blood Glucose Level'
            autoCapitalize="none"
            value={this.state.blood_glucose_level}
            onChangeText={blood_glucose_level => this.setState({ blood_glucose_level })}
            error={this.state.error}
          />
          <div className="smallBreakAfter"></div>
          <Button mode="contained"
            onPress={() => this.handleAdd()}>
            Submit
          </Button>
        </Surface>
        <IconButton
                color={Colors.white}
                size={60}
                onPress={() => this.handleAdd()}>
        </IconButton>
      </PaperProvider>
    );
  }
}
