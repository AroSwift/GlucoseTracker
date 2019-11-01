import * as React from 'react';
// how to use: https://react-icons.netlify.com/#/icons/fa
import { FiLogIn, FiCheckSquare } from "react-icons/fi";
import { MdAccessibility, MdAccessible, MdSettings } from "react-icons/md";
import {
  Button, Appbar, Provider as PaperProvider
} from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import './stylesheets/Main.css';
// import * as firebase from "firebase";
// import { firebase } from './config.js';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen.js';
import GlucoseScreen from './screens/GlucoseScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';

export class NotLoggedIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current_page: 'login',
    };
  }

  handle_current_page = (page) => {
    this.setState({current_page: page});
    this.page_content();
  }

  handle_logged_in = (logged_in_status) => {
    this.props.on_handle_logged_in(logged_in_status);
  }

  handle_user_uid = (user_uid) => {
    this.props.on_handle_user_uid(user_uid);
  }

  handle_auth_uid = (auth_uid) => {
    this.props.on_handle_auth_uid(auth_uid);
  }

  handle_user_type = (user_type) => {
    this.props.on_handle_user_type(user_type);
  }

  header(props) {
    return (
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content
            title="Glucose Tracker"
          />
          <Button mode="text" onPress={() => this.setState({ current_page: 'login'})} color="white">
            <FiLogIn className="icon"/>
            Login
          </Button>

          <Button mode="text" onPress={() => this.setState({ current_page: 'signup'})} color="white">
            <FiCheckSquare className="icon"/>
            Sign Up
          </Button>
        </Appbar.Header>
      </PaperProvider>
    );
  }

  page_content(props) {
    if(this.state.current_page === 'login') {
      return (<LoginScreen
        on_handle_current_page={this.handle_current_page}
        on_handle_logged_in={this.handle_logged_in}
        on_handle_user_uid={this.handle_user_uid}
        on_handle_auth_uid={this.handle_auth_uid}
        on_handle_user_type={this.handle_user_type} />);
    } else if(this.state.current_page === 'signup') {
      return (<SignUpScreen on_handle_current_page={this.handle_current_page} />);
    } else { // default
      this.setState({ current_page: 'login' }); // update for future
      return (<LoginScreen
        on_handle_current_page={this.handle_current_page}
        on_handle_logged_in={this.handle_logged_in}
        on_handle_user_uid={this.handle_user_uid}
        on_handle_auth_uid={this.handle_auth_uid}
        on_handle_user_type={this.handle_user_type} />);
    }
  }

  render() {
    return (
      <div>
        {this.header()}
        {this.page_content()}
      </div>
    );
  }
}


export class LoggedIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current_page: 'login',
      user_uid: null,
      auth_uid: null,
      user_type: null,
    };
  }

  handle_logged_in = (logged_in_status) => {
    console.log(logged_in_status);
    this.props.on_handle_logged_in(logged_in_status);
  }

  handle_current_page = (page) => {
    console.log(page);
    this.setState({current_page: page});
    this.page_content();
  }

  header(props) {
    return (
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content
            title="Glucose Tracker"
          />
          <Button mode="text" onPress={() => this.setState({ current_page: 'patients'})} color="white">
            <MdAccessible className="icon"/>
            Patients
          </Button>

          <Button mode="text" onPress={() => this.setState({ current_page: 'doctors'})} color="white">
            <MdAccessibility className="icon"/>
            Doctors
          </Button>

          <Button mode="text" onPress={() => this.setState({ current_page: 'settings'})} color="white">
            <MdSettings className="icon"/>
            Settings
          </Button>
        </Appbar.Header>
      </PaperProvider>
    );
  }

  page_content(props) {
    if(this.state.current_page === 'glucose') {
      return (<GlucoseScreen on_handle_current_page={this.handle_current_page} />);
    } else if(this.state.current_page === 'settings') {
      return (<SettingsScreen
        on_handle_logged_in={this.handle_logged_in}
        on_handle_current_page={this.handle_current_page} />);
    } else {
      this.setState({ current_page: 'glucose' });
      return (<GlucoseScreen on_handle_logged_in={this.handle_logged_in} />);
    }
  }

  render() {
    return (
      <div>
        {this.header()}
        {this.page_content()}
      </div>
    );
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logged_in: false,
      user_uid: null,
      auth_uid: null,
      user_type: null,
    };

    if(!this.state.logged_in) {
      this.handlePreviousLogin();
    }
  }

  handle_logged_in = (logged_in_status) => {
    console.log('changing loggedIn status in App');
    console.log(logged_in_status);
    this.setState({logged_in: logged_in_status});
  }

  handle_user_uid = (user_uid) => {
    console.log('changing user UID status in App');
    console.log(user_uid);
    this.setState({user_uid: user_uid});
  }

  handle_auth_uid = (auth_uid) => {
    console.log('changing auth UID status in App');
    console.log(auth_uid);
    this.setState({auth_uid: auth_uid});
  }

  handle_user_type = (user_type) => {
    console.log('changing user type status in App');
    console.log(user_type);
    this.setState({user_type: user_type});
  }

  // Previously logged in
  async handlePreviousLogin() {
    try {
      var user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');
      var auth_uid = await AsyncStorage.getItem('@GlucoseTracker:auth_uid');
      var email = await AsyncStorage.getItem('@GlucoseTracker:email');
      var password = await AsyncStorage.getItem('@GlucoseTracker:password');

      if(auth_uid != null && email != null && password != null && user_uid != null) {
        // await firebase.auth()
        //   .signInWithEmailAndPassword(email, password);

        console.log("Already logged in", user_uid);

        this.setState({ logged_in: true });
        this.render();
      }
    } catch(error) {
      console.log("Not already logged in");
    }
  }

  render() {
    if(this.state.logged_in) {
      return (<LoggedIn
        on_handle_logged_in={this.handle_logged_in} />);
    } else {
      return (<NotLoggedIn
        on_handle_logged_in={this.handle_logged_in}
        on_handle_user_uid={this.handle_user_uid}
        on_handle_auth_uid={this.handle_auth_uid}
        on_handle_user_type={this.handle_user_type} />);
    }
  }
}
