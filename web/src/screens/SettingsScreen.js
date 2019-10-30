import * as React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Button, Surface, Provider as PaperProvider
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
