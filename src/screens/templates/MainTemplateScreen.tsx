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
import SettingsScreen from '../SettingsScreen';

export default class MainTemplateScreen extends Component {
  static navigationOptions = {
  title: "Glucose Tracker",
  headerStyle: { marginTop: 24 },
  headerStyle: {
      backgroundColor: '#6221ea',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    routes: [
      { key: 'glucose', title: 'Glucose', icon: 'healing',
        navigation: this.props.navigation, user_uid: this.props.navigation.state.params.user_uid },
      { key: 'nutrition', title: 'Nutrition', icon: 'local-cafe',
        navigation: this.props.navigation, user_uid: this.props.navigation.state.params.user_uid },
      { key: 'exercise', title: 'Exercise', icon: 'directions-bike',
        navigation: this.props.navigation, user_uid: this.props.navigation.state.params.user_uid },
      { key: 'settings', title: 'Settings', icon: 'settings-applications',
        navigation: this.props.navigation, user_uid: this.props.navigation.state.params.user_uid },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    glucose: GlucoseScreen,
    nutrition: NutritionScreen,
    exercise: ExerciseScreen,
    settings: SettingsScreen,
  });

/*
  <Appbar.Header>
    <Appbar.Content
      title="Glucose Tracker"
      subtitle={this.state.routes[this.state.index].title}
    />
  </Appbar.Header>
  */

  render() {
    return (
      <PaperProvider>


        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </PaperProvider>
    )
  }
}
