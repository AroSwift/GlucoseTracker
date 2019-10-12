// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';

import MainTemplate from './templates/MainTemplate';

export default class NutritionScreen extends Component {
  render() {
    return (
      <MainTemplate/>
    );
  }
}
