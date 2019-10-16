// Get all the necessary components from React
import React, { Component } from 'react';
import { FlatList, StyleSheet, AsyncStorage } from 'react-native';
import {
  Button, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
//import db from 'firebase';
import { firebase } from '../config';
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';


export default class NutritionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
          foodName: '',
          error: false,
          errorMessage: null,
          loading: true,
          dataSource:[]
    };
  }



    async handleAPIRequest() {
        //Uses search data to call from food API


        try {




              const response = await fetch( 'https://api.nal.usda.gov/fdc/v1/search?api_key=yBTV1ueQfiTbtlcJrpStrLNFEoF5AHdkjMmb9cZ1',  {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      //api_key: 'yBTV1ueQfiTbtlcJrpStrLNFEoF5AHdkjMmb9cZ',
                      generalSearchInput: 'apple',
                  }),
              })
               .then(
                  (response) => response.json()
                )
                .then((responseData) => {
                          console.log(
                              "POST Response",
                                "Response Body -> " + JSON.stringify(responseData)
      )
  })









           // const response = await fetch('https://@api.nal.usda.gov/fdc/v1/search', {
           //        method: 'POST',
           //        headers: {
           //              Accept: 'application/json',
           //              'Content-Type' : 'application/json',
           //          },
           //          body: JSON.stringify({
           //            api_key: 'yBTV1ueQfiTbtlcJrpStrLNFEoF5AHdkjMmb9cZ1',
           //            generalSearchInput: this.state.foodName,
           //          }),
           //
           //        })



        }
        catch (error) { console.error(error)}

  }



render(){


return(

  <PaperProvider>
    <Surface style={styles.loginContainer}>
      <Text style={styles.loginHeader}>Input Food Name</Text>
      { this.state.errorMessage != null &&
        <Text style={styles.mainError}>{this.state.errorMessage}</Text>
      }
      <TextInput
        label='Food Name'
        autoCapitalize="none"
        value={this.state.foodName}
        onChangeText={foodName => this.setState({ foodName })}
        style={styles.breakAfter}
        error={this.state.error}
      />
      <Button
        title="Search"
         mode="contained"
         onPress={() => this.handleAPIRequest()}
         style={styles.breakAfter}>
         Search
      </Button>

      <FlatList
       data={this.state.dataSource}
       keyExtractor={(x, i) => i}
       renderItem={({ item }) =>

       <Text>
          {item.foods.foodName}
      </Text>}
     />

    </Surface>
  </PaperProvider>
);
}
}
