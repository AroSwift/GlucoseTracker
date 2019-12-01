// Get all the necessary components from React
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Button, Colors, IconButton, TextInput, Text, Surface, Card, Provider as PaperProvider } from 'react-native-paper';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
// Get all the stylesheets
import { styles } from '../stylesheets/Main';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';

//import db from 'firebase';
import { firebase } from '../config';
const screenWidth = Dimensions.get("window").width;

const meal_chart_data = {
  data: [],
  labels: ['Breakfast','Lunch','Dinner']
};

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//   datasets: [{
//     data: [ 20, 45, 28, 80, 99, 43 ],
//     color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//     strokeWidth: 2 // optional
//   }]
// }



// TODO: add date picker after blood glucose level
export default class GlucoseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patients_data: [],
      glucose_Data: [],
      meal_data: [],
      BreakfastAVGGlucose: 0.0,
      LunchAVGGlucose: 0.0,
      DinnerAVGGlucose: 0.0,
    };

  }

  componentDidMount() {
    this.getData().then(result =>
      this.setState({ glucose_Data: result })
    )
  }
  async getData() {
    try {
      let user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');
      let exe_docs = firebase.firestore().collection("glucose");

      await exe_docs.where('user_id', '==', user_uid).get()
        .then(snapshot => {
          var exe_data = []
          var breakfastArray = []
          var lunchArray = []
          var dinnerArray = []

          snapshot.forEach(data => {
            // ensue that all data read is valid
            if (data.data().before_after != "NaN") {
              exe_data.push(data.data());

              if (data.data().meal == "Breakfast") {
                breakfastArray.push(data.data().blood_glucose_level);
              }
              else if (data.data().meal == "Lunch") {
                lunchArray.push(data.data().blood_glucose_level);
              }
              else {
                dinnerArray.push(data.data().blood_glucose_level);
              }
            }
          });
          this.state.meal_data.push(Math.round((breakfastArray.reduce((a, b) => a + b, 0))/breakfastArray.length)/100);
          this.state.meal_data.push(Math.round((lunchArray.reduce((a, b) => a + b, 0))/lunchArray.length)/100);
          this.state.meal_data.push(Math.round((dinnerArray.reduce((a, b) => a + b, 0))/dinnerArray.length)/100);

          meal_chart_data.data = this.state.meal_data;
        });
    } catch (err) {
      console.log(err);
    }
  }


  render() {
    //console.log(this.state.DinnerAVGGlucose);
    return (
      <PaperProvider>
      <Surface style={styles.contentContainer}>
      <ScrollView>
          <View>
          {/*Example of Progress Chart*/}
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  padding: 16,
                  marginTop: 16,
                }}>
                Meal Blood Glocose Levels History
              </Text>
              <ProgressChart
                data={meal_chart_data}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#b1f9f8',
                  backgroundGradientTo: '#b1f9f8',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              {/*Example of Contribution Chart*/}
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  padding: 16,
                  marginTop: 16,
                }}>
                Glucose Contribution Graph
              </Text>
              <ContributionGraph
                values={[
                  { date: '2019-01-02', count: 1 },
                  { date: '2019-01-03', count: 2 },
                  { date: '2019-01-04', count: 3 },
                  { date: '2019-01-05', count: 4 },
                  { date: '2019-01-06', count: 5 },
                  { date: '2019-01-30', count: 2 },
                  { date: '2019-01-31', count: 3 },
                  { date: '2019-03-01', count: 2 },
                  { date: '2019-04-02', count: 4 },
                  { date: '2019-03-05', count: 2 },
                  { date: '2019-02-30', count: 4 },
                ]}
                endDate={new Date('2019-04-01')}
                numDays={105}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#b1f9f8',
                  backgroundGradientTo: '#b1f9f8',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
              />
                {/*Example of Bar Chart*/}
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    padding: 16,
                    marginTop: 16,
                  }}>
                  Glucose Levels Bar Chart
                </Text>
                <BarChart
                  data={{
                    labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                    ],
                    datasets: [
                      {
                        data: [20, 45, 28, 80, 99, 43],
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width}
                  height={220}
                  yAxisLabel={'$'}
                  chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#b1f9f8',
                    backgroundGradientTo: '#b1f9f8',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
          </View>
      </ScrollView>
      </Surface>
      <IconButton
              style={styles.circularButton}
              color={Colors.white}
              icon={require('../../assets/plus.png')}
              size={60}
              onPress={() => this.props.route.navigation.navigate('AddGlucose')}>
      </IconButton>
      </PaperProvider>
    );
  }
}
