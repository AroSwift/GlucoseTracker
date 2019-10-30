import * as React from 'react';
// how to use: https://react-icons.netlify.com/#/icons/fa
import { FiLogIn, FiCheckSquare } from "react-icons/fi";
import { MdAccessibility, MdAccessible, MdSettings } from "react-icons/md";
import {
  Button, Appbar, Provider as PaperProvider
} from 'react-native-paper';
import './stylesheets/Main.css';
// import * as firebase from "firebase";

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen.js';

export class NotLoggedIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current_page: 'login',
    };
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

  handle_current_page = (page) => {
    console.log(page);
    this.setState({current_page: page});
    this.page_content();
  }

  page_content(props) {
    console.log(this.state.current_page);
    if(this.state.current_page === 'login') {
      return (<LoginScreen on_handle_current_page={this.handle_current_page} />);
    } else if(this.state.current_page === 'signup') {
      return (<SignUpScreen on_handle_current_page={this.handle_current_page} />); // change to signup
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
  render() {
    return (
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content
            title="Glucose Tracker"
          />
          <Button mode="text" onPress={() => console.log('glucose')} color="white">
            <MdAccessible className="icon"/>
            Patients
          </Button>

          <Button mode="text" onPress={() => console.log('nutrition')} color="white">
            <MdAccessibility className="icon"/>
            Doctors
          </Button>

          <Button mode="text" onPress={() => console.log('Settings')} color="white">
            <MdSettings className="icon"/>
            Settings
          </Button>
        </Appbar.Header>
      </PaperProvider>
    );
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logged_in: false,
    };
  }

  render() {
      if(this.state.logged_in) {
        return (<LoggedIn />);
      } else {
        return (<NotLoggedIn />);
      }
  }
}
