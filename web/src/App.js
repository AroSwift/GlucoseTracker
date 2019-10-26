import * as React from 'react';
import { View } from 'react-native';
import { MdAccessibility, MdAccessible, MdSettings } from "react-icons/md"; // how to use: https://react-icons.netlify.com/#/icons/fa
import {
  Button, Text, Appbar, Provider as PaperProvider
} from 'react-native-paper';
import './stylesheets/Main.css';
// import './App.css';

export default class App extends React.Component {
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
