import * as React from 'react';
import { AsyncStorage } from 'react-native';
import {
  TextInput, Button, Surface, Provider as PaperProvider
} from 'react-native-paper';
import '../stylesheets/Main.css';

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: null,
    }
  }

  // Logout
  async handleLogOut() {
    try {
      await AsyncStorage.removeItem('@GlucoseTracker:user_type');
      await AsyncStorage.removeItem('@GlucoseTracker:auth_uid');
      await AsyncStorage.removeItem('@GlucoseTracker:user_uid');
      await AsyncStorage.removeItem('@GlucoseTracker:email');
      await AsyncStorage.removeItem('@GlucoseTracker:password');

      this.props.on_handle_logged_in(false);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <PaperProvider>
        <Surface className="settingsContainer">

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

          <Button mode="contained"
            onPress={() => this.handleChangeSettings()}>
            Update Account
          </Button>
          <div className="breakAfter"></div>

          <Button
            title="Logout"
            mode="contained"
            onPress={() => this.handleLogOut()}>
            Logout
          </Button>
        </Surface>
      </PaperProvider>
    );
  }
}
