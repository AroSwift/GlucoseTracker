import * as React from 'react';
import { MdAccessibility, MdAccessible, MdSettings } from "react-icons/md";
import {
  Button, Appbar, Provider as PaperProvider
} from 'react-native-paper';
import '../stylesheets/Main.css';
// import * as firebase from "firebase";
// import { firebase } from './config.js';

import GlucoseScreen from '../screens/GlucoseScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';

export default class LoggedInDoctor extends React.Component {

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
