// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, TextInput, Text, Appbar, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
// Get all the stylesheets
import { styles } from '../../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../../config';

export default class MainTemplate extends Component {
  render() {
    return (
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content
            title="GlucoseTracker"
            subtitle="Home"
          />
        </Appbar.Header>

        <Appbar style={styles.bottom}>
          <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
          <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
          <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
          <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
        </Appbar>
      </PaperProvider>
    )
  }
}
