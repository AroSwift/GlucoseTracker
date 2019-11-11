import * as React from 'react';
// how to use: https://react-icons.netlify.com/#/icons/fa
import { FiLogIn, FiCheckSquare } from "react-icons/fi";
import {
  Button, Appbar, Provider as PaperProvider
} from 'react-native-paper';
import '../stylesheets/Main.css';
// import * as firebase from "firebase";
// import { firebase } from './config.js';

// Content screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen.js';

export default class NotLoggedIn extends React.Component {

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
      return (<SignUpScreen
        on_handle_current_page={this.handle_current_page}
        on_handle_logged_in={this.handle_logged_in}
        on_handle_user_uid={this.handle_user_uid}
        on_handle_auth_uid={this.handle_auth_uid}
        on_handle_user_type={this.handle_user_type} />);
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
