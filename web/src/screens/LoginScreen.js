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
          errorMessage: null,
          user_type: null,
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
              var user_ids = []
              var user_admins = []
              snapshot.forEach(doc => {
                user_ids.push(doc.id);
                user_admins.push(doc.data().admin);
                // console.log(doc.auth_id, '=>', doc.data());
              });
              console.log('user admin:', user_admins);

              // When the user provided is an admin
              if(user_admins[0]) {
                this.setState({ user_type: 'admin' });
                this.setState({ user_uid: user_ids[0] });
              }
            });

          // User provided was not admin, could be doctor?
          if(this.state.user_type === null){
            let doctors = firebase.firestore().collection('doctors');
            await doctors.where('auth_id', '==', this.state.auth_uid).get()
              .then(snapshot => {
                var doctor_attrs = []
                snapshot.forEach(doc => {
                  doctor_attrs.push(doc.id);
                });
                console.log('doc attrs:', doctor_attrs);

                // When the user provided is a doctor
                this.setState({ user_type: 'doctor' });
                this.setState({ user_uid: doctor_attrs[0] });
              });
          }

          console.log('state: ', this.state.user_type);
          console.log('uid: ', this.state.user_uid);

          // User was not admin or doctor
          if(this.state.user_type === null) {
            this.setState({ error: true });
            this.setState({ errorMessage: "Provided user is not an admin or doctor." });
          } else { // Otherwise, login!
            console.log(this.state.user_uid);

            await AsyncStorage.setItem('@GlucoseTracker:user_type', this.state.user_type);
            await AsyncStorage.setItem('@GlucoseTracker:user_uid', this.state.user_uid);
            await AsyncStorage.setItem('@GlucoseTracker:auth_uid', this.state.auth_uid);
            await AsyncStorage.setItem('@GlucoseTracker:email', this.state.email);
            await AsyncStorage.setItem('@GlucoseTracker:password', this.state.password);

            // console.log("Logged In!", this.state.user_uid);
            // console.log("Logged In!", this.state.auth_uid);
            // console.log("Logged In!", this.state.email);
            // console.log("Logged In!", this.state.password);

            this.props.on_handle_logged_in(true);
          }
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
