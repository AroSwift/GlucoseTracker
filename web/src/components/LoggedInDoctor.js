import * as React from 'react';
import { FaRegAddressCard, FaPlusCircle } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import {
  Button, Appbar, Provider as PaperProvider
} from 'react-native-paper';
import '../stylesheets/Main.css';

import PatientListScreen from '../screens/PatientListScreen.js';
import PatientDataScreen from '../screens/PatientDataScreen.js';
import PatientAddScreen from '../screens/PatientAddScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';

export default class LoggedInDoctor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current_page: 'patient_list',
      user_uid: null,
      auth_uid: null,
      user_type: null,
      patient_auth_id: '',
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

  handle_patient_auth_id = (auth_id) => {
    this.setState({current_auth_id: auth_id});
  }

  header(props) {
    return (
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content
            title="Glucose Tracker: Doctor"
          />
          <Button mode="text" onPress={() => this.setState({ current_page: 'patients'})} color="white">
            <FaRegAddressCard className="icon"/>
            Patients List
          </Button>

          <Button mode="text" onPress={() => this.setState({ current_page: 'doctors'})} color="white">
            <FaPlusCircle className="icon"/>
            Add Patient
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
        on_handle_patient_auth_id={this.handle_patient_auth_id} />);
    } else if(this.state.current_page === 'patient_add') {
        return (<PatientAddScreen on_handle_current_page={this.handle_current_page} />);
    } else if(this.state.current_patient_auth_id !== '' && this.state.current_page === 'patient_data') {
      return (<PatientDataScreen
        on_handle_current_page={this.handle_current_page}
        patient_auth_id={this.state.current_auth_id} />);
    } else if(this.state.current_page === 'settings') {
      return (<SettingsScreen
        on_handle_logged_in={this.handle_logged_in}
        on_handle_current_page={this.handle_current_page} />);
    } else {
      this.setState({ current_page: 'patient_list' });
      return (<PatientListScreen
        on_handle_current_page={this.handle_current_page}
        on_handle_patient_auth_id={this.handle_patient_auth_id} />);
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
