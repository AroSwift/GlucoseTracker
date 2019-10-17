// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigation, Button, TextInput, Text, Appbar, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
// Get all the stylesheets
import { styles } from '../../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../../config';

import GlucoseScreen from '../GlucoseScreen';
import NutritionScreen from '../NutritionScreen';
import ExerciseScreen from '../ExerciseScreen';
import ViewDataScreen from '../ViewDataScreen';

export default class MainTemplateScreen extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    routes: [
      { key: 'glucose', title: 'Glucose', icon: 'healing',
        navigation: this.props.navigation },
      { key: 'nutrition', title: 'Nutrition', icon: 'local-cafe',
        navigation: this.props.navigation },
      { key: 'exercise', title: 'Exercise', icon: 'directions-bike',
        navigation: this.props.navigation },
      { key: 'viewdata', title: 'View Data', icon: 'settings-applications',
        navigation: this.props.navigation },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    glucose: GlucoseScreen,
    nutrition: NutritionScreen,
    exercise: ExerciseScreen,
    viewdata: ViewDataScreen,
  });

  render() {
    return (
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content
            title="Glucose Tracker"
            subtitle={this.state.routes[this.state.index].title}
          />
        </Appbar.Header>

        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </PaperProvider>
    )
  }
}
