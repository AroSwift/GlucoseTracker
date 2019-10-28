import * as React from 'react';
import { View } from 'react-native';
// how to use: https://react-icons.netlify.com/#/icons/fa
import { FiLogIn, FiCheckSquare } from "react-icons/fi";
import { MdAccessibility, MdAccessible, MdSettings } from "react-icons/md";
import {
  Button, Text, Appbar, Provider as PaperProvider
} from 'react-native-paper';
import './stylesheets/Main.css';
// import './App.css';


export class NotLoggedIn extends React.Component {
  render() {
    return (
      <PaperProvider>
        <Appbar.Header>
          <Appbar.Content
            title="Glucose Tracker"
          />
          <Button mode="text" onPress={() => console.log('login')} color="white">
            <FiLogIn className="icon"/>
            Login
          </Button>

          <Button mode="text" onPress={() => console.log('signup')} color="white">
            <FiCheckSquare className="icon"/>
            Sign Up
          </Button>
        </Appbar.Header>
      </PaperProvider>
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
  render() {
    const logged_in = false;
      if(logged_in) {
        return (<LoggedIn />);
      } else {
        return (<NotLoggedIn />);
      }
  }
}
