// Get all the necessary components from React
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
// Get all the stylesheets
import { styles } from '../stylesheets/Main.js';

// TODO: once logged in, redirect to nutrition page

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  render() {
    return (
      <Surface style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Sign In</Text>
        <TextInput
          label='Email'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.breakAfter}
        />
        <TextInput
          label='Password'
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          style={styles.breakAfter}
        />
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Login
        </Button>
      </Surface>
    );
  }
}
