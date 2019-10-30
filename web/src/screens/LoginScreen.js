import * as React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Button, TextInput, Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import '../stylesheets/Main.css';
//import db from 'firebase';
// import * as firebase from "firebase";
import { firebase } from '../config.js';


export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
          email: '',
          password: '',
          user_uid: null,
          auth_uid: null,
          error: false,
          errorMessage: null
    };
  }

  // Trying to log in
  async handleLogin() {

      try {
          await firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => {
              this.setState({ auth_uid: data.user.uid});
            });

          let users = firebase.firestore().collection('users');
          await users.where('auth_id', '==', this.state.auth_uid).get()
            .then(snapshot => {
              var user_uids = []
              snapshot.forEach(doc => {
                user_uids.push(doc.id);
                // console.log(doc.auth_id, '=>', doc.data());
              });
              console.log(user_uids);
              this.setState({ user_uid: user_uids[0] });
            })

          console.log(this.state.user_uid);

          await AsyncStorage.setItem('@GlucoseTracker:user_uid', this.state.user_uid);
          await AsyncStorage.setItem('@GlucoseTracker:auth_uid', this.state.auth_uid);
          await AsyncStorage.setItem('@GlucoseTracker:email', this.state.email);
          await AsyncStorage.setItem('@GlucoseTracker:password', this.state.password);

          console.log("Logged In!", this.state.user_uid);
          console.log("Logged In!", this.state.auth_uid);
          console.log("Logged In!", this.state.email);
          console.log("Logged In!", this.state.password);

          this.props.on_handle_logged_in(true);
      } catch (error) {
          console.log(error);

          // Set error message
          return this.setState({
            error: true,
            errorMessage: error.toString()
          });
      }
  }

  render() {
    return (
      <PaperProvider>
        <Surface className="loginContainer">
          <Text className="loginHeader">Log In</Text>
          { this.state.errorMessage != null &&
            <Text>{this.state.errorMessage}</Text>
          }
          <TextInput
            label='Email'
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            error={this.state.error}
          />
          <div className="breakAfter"></div>
          <TextInput
            label='Password'
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            error={this.state.error}
          />
          <div className="breakAfter"></div>
          <Button
            title="Login"
             mode="contained"
             onPress={() => this.handleLogin()}>
             Login
          </Button>
          <div className="smallBreakAfter"></div>
          <Button mode="contained"
             onPress={() => this.props.on_handle_current_page('signup')}>
                Need an account? Sign Up.
          </Button>
        </Surface>
      </PaperProvider>
    );
  }
}
