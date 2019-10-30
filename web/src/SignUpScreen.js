import * as React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Button, TextInput, Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import './stylesheets/Main.css';
//import db from 'firebase';
// import * as firebase from "firebase";
import { firebase } from './config.js';


export default class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          errorMessage: null
    };
  }

  async handleSignUp(email, pass) {

      try {
          await firebase.auth()
              .createUserWithEmailAndPassword(email, pass);

          console.log("Account created");
          // Navigate to the Home page, the user is auto logged in
      } catch (error) {
          console.log(error.toString())
      }
  }

render() {
    return (
      <PaperProvider>
        <Surface className="signUpContainer">
          <Text className="signUpHeader">Sign Up</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <div className="breakAfter"></div>
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <div className="breakAfter"></div>
          <Button
            title="Login"
            mode="contained"
            onPress={this.handleSignUp}>
            Sign Up
          </Button>
          <div className="smallBreakAfter"></div>
          <Button
            mode="contained"
            onPress={() => this.props.on_handle_current_page('login')}>
                Already have an account? Login.
          </Button>
        </Surface>
      </PaperProvider>
    )
  }
}
