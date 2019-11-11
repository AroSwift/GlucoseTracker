import * as React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Button, TextInput, Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import '../stylesheets/Main.css';
//import db from 'firebase';
// import * as firebase from "firebase";
import { firebase } from '../config.js';


export default class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          errorMessage: null
    };
  }

  async handleSignUp() {
      try {
        await firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(data => {
            this.setState({ auth_id: data.user.uid});
          });

        if(this.state.auth_id != null) {
          // Create UID and save to Firebase
          firebase.firestore().collection('doctors').doc()
            .set({
              auth_id: this.state.auth_id,
              first_name: this.state.first_name,
              last_name: this.state.last_name
            });

          console.log("Account created");
          console.log(this.state.auth_id);

          // Persist login now
          await AsyncStorage.setItem('@GlucoseTracker:user_uid', this.state.user_uid);
          await AsyncStorage.setItem('@GlucoseTracker:auth_id', this.state.auth_id);
          await AsyncStorage.setItem('@GlucoseTracker:email', this.state.email);
          await AsyncStorage.setItem('@GlucoseTracker:password', this.state.password);

          console.log("Logged In!", this.state.user_uid);

          await firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password);

          // Login for realz now
          this.props.on_handle_logged_in(true);
          this.props.on_handle_user_uid(this.state.user_uid);
          this.props.on_handle_auth_uid(this.state.auth_uid);
          this.props.on_handle_user_type(this.state.user_type);
        }
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
            label='First Name'
            autoCapitalize="none"
            value={this.state.first_name}
            onChangeText={first_name => this.setState({ first_name })}
            error={this.state.error}
          />
          <div className="breakAfter"></div>
          <TextInput
            label='Last Name'
            autoCapitalize="none"
            value={this.state.last_name}
            onChangeText={last_name => this.setState({ last_name })}
            error={this.state.error}
          />
          <div className="breakAfter"></div>
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
            onPress={() => this.handleSignUp()}>
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
