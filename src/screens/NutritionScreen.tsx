// Get all the necessary components from React
import React, { Component } from 'react';
import { FlatList, StyleSheet, AsyncStorage, SafeAreaView, Alert, View, TouchableOpacity } from 'react-native';
import {
  Button, Colors, IconButton, TextInput, Text, Surface, Card, Provider as PaperProvider
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
import { Dropdown } from 'react-native-material-dropdown';


export default class NutritionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
          foodName: '',
          specFoodID: '',
          error: false,
          errorMessage: null,
          loading: true,
          dataSource:[],
          specDataSource:[]
    };
  }




    async handleGeneralAPIRequest() {
        //Uses search data to call from food API
        try {

              const response = await fetch( 'https://api.nal.usda.gov/fdc/v1/search?api_key=yBTV1ueQfiTbtlcJrpStrLNFEoF5AHdkjMmb9cZ1',  {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      generalSearchInput: this.state.foodName,
                  }),
              })
               .then((response) => response.json() )
                .then((responseJson) => {
                          console.log(
                              "POST Response",
                              "Response Body -> " + JSON.stringify(responseJson)
                          )

                          this.setState({
                            isLoading: false,
                            dataSource: responseJson.foods,
                          },function(){
                          });
              })
        }
        catch (error) { console.error(error)}

        }

        async logDataSource()
        {
          console.log(' ')
          console.log(' ')
          console.log(' ')
          console.log(' ')
          console.log(JSON.stringify(this.state.dataSource[0]))
          console.log(JSON.stringify(this.state.dataSource[1]))
          console.log(JSON.stringify(this.state.dataSource[2]))
        }


        async setIdAndSearch(searchedFoodID)
        {
          this.setSpecificID(searchedFoodID);
          this.handleSpecificAPIRequest();
        }


        async setSpecificID(goodFoodID)
        {
          this.setState({ specFoodID: goodFoodID });
        }


        async handleSpecificAPIRequest() {
            //Uses search data to call from food API
            try {

                  const response = await fetch('https://api.nal.usda.gov/fdc/v1/' + this.state.specFoodID + '?api_key=yBTV1ueQfiTbtlcJrpStrLNFEoF5AHdkjMmb9cZ1')

                   .then(
                      (response) => response.json()
                  )
                    .then((responseData) => {
                              console.log(
                                  "Good Reply",
                                  "Response Body -> " + JSON.stringify(responseData)
                                )

                                this.setState({
                                  isLoading: false,
                                  specDataSource: responseData,
                                }, function(){
                                });
                              this.addFoodToDatabase();
                  })

            }
            catch (error) { console.error(error)}

            }

async addFoodToDatabase()
{
    //  var calories = this.state.specDataSource[0];

}






render(){
  let meal_options = [{ value: 'Breakfast', }, { value: 'Lunch', }, { value: 'Dinner', }];

return(

  <PaperProvider>
    <Surface style={styles.contentContainer}>

      <Text style={styles.generalHeader}>Add Food</Text>
      { this.state.errorMessage != null &&
        <Text style={styles.mainError}>{this.state.errorMessage}</Text>
      }

      <Dropdown
        label='Breakfast / Lunch / Dinner'
        onChangeText={meal => this.setState({ meal })}
        data={meal_options}
      />
      <TextInput
        label='Enter Food'
        autoCapitalize="none"
        value={this.state.foodName}
        onChangeText={foodName => this.setState({ foodName })}
        style={styles.breakAfter}
        error={this.state.error}
      />
      <Button
        title="Search"
         mode="contained"
         onPress={() => this.handleGeneralAPIRequest()}
         style={styles.breakAfter}>
         Search
      </Button>

<View>
      <FlatList
       data={this.state.dataSource}
       keyExtractor={(x, i) => i}
       renderItem={({ item }) => <View style={styles.list}>

       <Text>Name : {item.description}</Text>
       <Text>Age : {item.fdcId}</Text>
       <TouchableOpacity onPress={() => {
         this.setIdAndSearch(item.fdcId)
       }} style ={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>

        </View>}


      />

</View>


    </Surface>

  </PaperProvider>
);
}
}



// <TextInput
//   label='Enter Specific Food ID'
//   autoCapitalize="none"
//   value={this.state.specFoodID}
//   onChangeText={specFoodID => this.setState({ specFoodID })}
//   style={styles.breakAfter}
//   error={this.state.error}
// />
// <Button
//   title="Add Known Food"
//    mode="contained"
//    onPress={() => this.handleSpecificAPIRequest()}
//    style={styles.breakAfter}>
//    Add known food
// </Button>
//
// <Button
//   title="Show Data Source"
//    mode="contained"
//    onPress={() => this.logDataSource()}
//    style={styles.breakAfter}>
//    Show Data Source
// </Button>
//
//
//
// <FlatList
//  data={this.state.dataSource}
//  keyExtractor={(x, i) => i}
//  renderItem={({ item }) =>
//
//  <Text>
//     {item.fdcId}
// </Text>}
// />
//
// <IconButton
//         style={styles.circularButton}
//         color={Colors.white}
//         icon={require('../../assets/plus.png')}
//         size={60}
//         onPress={() => this.handleAdd()}>
// </IconButton>
