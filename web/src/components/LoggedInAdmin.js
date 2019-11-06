import * as React from 'react';
import { FaRegAddressCard, FaPlusCircle, FaStethoscope } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import {
  Button, Appbar, Provider as PaperProvider
} from 'react-native-paper';
import '../stylesheets/Main.css';
// import * as firebase from "firebase";
// import { firebase } from './config.js';

// Content screens
import PatientListScreen from '../screens/PatientListScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';

export default class LoggedInAdmin extends React.Component {

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
          <Button mode="text" onPress={() => this.setState({ current_page: 'patient_list'})} color="white">
            <FaRegAddressCard className="icon"/>
            Patients List
          </Button>

          <Button mode="text" onPress={() => this.setState({ current_page: 'doctors'})} color="white">
            <FaStethoscope className="icon"/>
            Doctors
          </Button>

          <Button mode="text" onPress={() => this.setState({ current_page: 'doctors'})} color="white">
            <FaPlusCircle className="icon"/>
            Add Doctor
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
    if(this.state.current_page === 'patient_list') {
      return (<PatientListScreen
        on_handle_current_page={this.handle_current_page}
        show_all={true} />);
    // } else if(this.state.current_page === 'patient_add') {
    //     return (<DoctorAddScreen on_handle_current_page={this.handle_current_page} />);
    } else if(this.state.current_page === 'settings') {
      return (<SettingsScreen
        on_handle_logged_in={this.handle_logged_in}
        on_handle_current_page={this.handle_current_page} />);
    } else {
      this.setState({ current_page: 'patient_list' });
      return (<PatientListScreen
        on_handle_logged_in={this.handle_logged_in}
        show_all={true} />);
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
