// Get all the necessary components from React
import React, { Component } from 'react';
import { FlatList, StyleSheet, AsyncStorage, SafeAreaView, Alert, View, TouchableOpacity, ScrollView } from 'react-native';
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
          meal : '',
          foodName: '',
          specFoodID: '',
          error: false,
          errorMessage: null,
          loading: true,
          dataSource:[],
          specDataSource:[],
          foodNutrients:[],
    };
  }


    async handleGeneralAPIRequest()
    {
        //user input used to search through FDC API
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
                          this.setState({
                            isLoading: false,
                            dataSource: responseJson.foods,
                          },function(){
                          });
              })
        }
        catch (error) { console.error(error)}

      }


        //calls a set for the specific food ID and calls the API search for one food
        async setIdAndSearch(searchedFoodID)
        {
          await this.setSpecificID(searchedFoodID);
          this.handleSpecificAPIRequest();
        }


        //sets the food ID based on flatlist search
        async setSpecificID(goodFoodID)
        {
          this.setState({ specFoodID: goodFoodID });
        }



        //Uses specific ID to get data from FDC API on a specific food
        async handleSpecificAPIRequest() {
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
                                this.setState({foodNutrients : this.state.specDataSource["foodNutrients"]})
                                this.addFoodToDatabase();
                  })

            }
            catch (error) { console.error(error)}

            }

//Pulls data from specific food and assigns it to variables. Adds that data to DB
async addFoodToDatabase()
{

  var protein;
  var carbohydrate;
  var fat;
  var calorie;
  for ( const nutr of this.state.foodNutrients) {

    switch(nutr.nutrient.name) {

         case 'Protein':

            protein = nutr.nutrient.number + nutr.nutrient.unitName;
           console.log(nutr.id + '\t ' + nutr.nutrient.name + '\t ' + nutr.nutrient.number + '\t ' + nutr.nutrient.unitName);
           break;

         case 'Carbohydrate, by difference':
          carbohydrate = nutr.nutrient.number + nutr.nutrient.unitName;
           console.log(nutr.id + '\t ' + nutr.nutrient.name + '\t ' + nutr.nutrient.number + '\t ' + nutr.nutrient.unitName);
           break;

         case 'Total lipid (fat)':
         fat = nutr.nutrient.number + nutr.nutrient.unitName;
           console.log(nutr.id + '\t ' + nutr.nutrient.name + '\t ' + nutr.nutrient.number + '\t ' + nutr.nutrient.unitName);
           break;

         case 'Energy':
         calorie = nutr.nutrient.number + nutr.nutrient.unitName;
            console.log(nutr.id + '\t ' + nutr.nutrient.name + '\t ' + nutr.nutrient.number + '\t ' + nutr.nutrient.unitName);
           break;

         default:
          //do nothing

         };

     }


      var date = new Date().getDate();
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear();
      var user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');


    try {

      let nutrition = firebase.firestore().collection('meal').doc(); //.doc(this.make_id(20));
      nutrition.set({
          type: this.state.meal,
          foodName: this.state.specDataSource.description,
          proteins: protein,
          carbohydrates: carbohydrate,
          fats: fat,
          calories: calorie,
          user_id: user_uid,
          day: date,
          month: month,
          year: year
      });

    }
    catch(err) { console.log(err)} }


render(){
  let meal_options = [{ value: 'Breakfast', }, { value: 'Lunch', }, { value: 'Dinner', }];

return(

  <PaperProvider>
    <Surface style={styles.container}>

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

</Surface>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.container}>

              <FlatList
               data={this.state.dataSource}
               keyExtractor={(x, i) => i}
               renderItem={({ item }) => <View style={styles.list}>

               <Text>Name : {item.description}</Text>
               <Text>fdcID : {item.fdcId}</Text>
               <TouchableOpacity onPress={() => {
                 this.setIdAndSearch(item.fdcId)
               }} style ={styles.fab}>
                  <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>

                </View>}


              />




          </View>
        </View>
      </ScrollView>

</PaperProvider>
);
}
}
