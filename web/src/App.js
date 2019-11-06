import * as React from 'react';
import { AsyncStorage } from 'react-native';
import './stylesheets/Main.css';
// Get icons here: https://react-icons.netlify.com/#/icons/fa

// Seperate header / context menus
import NotLoggedIn from './components/NotLoggedIn.js';
import LoggedInDoctor from './components/LoggedInDoctor';
import LoggedInAdmin from './components/LoggedInAdmin.js';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logged_in: false,
      user_uid: null,
      auth_uid: null,
      user_type: null,
    };
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

  componentDidMount() {
    if(!this.state.logged_in) {
      this.handlePreviousLogin();
    }
  }

  // Previously logged in
  async handlePreviousLogin() {
    try {
      var user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');
      var auth_uid = await AsyncStorage.getItem('@GlucoseTracker:auth_uid');
      var email = await AsyncStorage.getItem('@GlucoseTracker:email');
      var password = await AsyncStorage.getItem('@GlucoseTracker:password');

      if(auth_uid != null && email != null && password != null && user_uid != null) {
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
      if(this.state.user_type === 'admin') {
        return (<LoggedInAdmin
          on_handle_logged_in={this.handle_logged_in}
          on_handle_user_uid={this.handle_user_uid}
          on_handle_auth_uid={this.handle_auth_uid}
          on_handle_user_type={this.handle_user_type} />);
      } else { // doctor
        return (<LoggedInDoctor
          on_handle_logged_in={this.handle_logged_in}
          on_handle_user_uid={this.handle_user_uid}
          on_handle_auth_uid={this.handle_auth_uid}
          on_handle_user_type={this.handle_user_type} />);
      }
    } else {
      return (<NotLoggedIn
        on_handle_logged_in={this.handle_logged_in}
        on_handle_user_uid={this.handle_user_uid}
        on_handle_auth_uid={this.handle_auth_uid}
        on_handle_user_type={this.handle_user_type} />);
    }
  }
}
