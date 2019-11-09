// Get all the necessary components from React
import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import {
  Button, Colors, IconButton, TextInput, Text, Surface, Card, Provider as PaperProvider
} from 'react-native-paper';
import {
  LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart
} from "react-native-chart-kit";
// Get all the stylesheets
import { styles } from '../stylesheets/Main';

//import db from 'firebase';
import { firebase } from '../config';
const screenWidth = Dimensions.get("window").width;

// const data = {
//   labels: ["Swim", "Bike", "Run"],
//   data: [0.4, 0.6, 0.8]
// };

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ],
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    strokeWidth: 2 // optional
  }]
}

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

          console.log(this.state.meal_data);
        });
    } catch (err) {
      console.log(err);
    }
  }


  render() {
    //console.log(this.state.DinnerAVGGlucose);
    return (
      <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <View>
          {/*Example of Progress Chart*/}
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  padding: 16,
                  marginTop: 16,
                }}>
                Meal Blood Glocose
              </Text>
              <ProgressChart
                data={this.state.meal_data}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
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
          {/*Example of LineChart*/}
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  padding: 16,
                  marginTop: 16,
                }}>
                Glocose Series
              </Text>
              <LineChart
                data={{
                  labels: [
                    'Breakfast',
                    'Lunch',
                    'Dinner',
                  ],
                  datasets: [
                    {
                      data: [20, 45, 28, 80, 99, 43],
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
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
        </View>
      </ScrollView>
      <IconButton
              style={styles.circularButton}
              color={Colors.white}
              icon={require('../../assets/plus.png')}
              size={60}
              onPress={() => this.handleAdd()}>
      </IconButton>
      </PaperProvider>
    );
  }
}


// <ScrollView>
//   <View style={styles.container}>
//     <View>
//       {/*Example of Bezier LineChart*/}
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 18,
//           padding: 16,
//           marginTop: 16,
//         }}>
//         Bezier Line Chart
//       </Text>
//       <LineChart
//         data={{
//           labels: ['January', 'February', 'March', 'April'],
//           datasets: [
//             {
//               data: [
//                 Math.random() * 100,
//                 Math.random() * 100,
//                 Math.random() * 100,
//                 Math.random() * 100,
//                 Math.random() * 100,
//                 Math.random() * 100,
//               ],
//             },
//           ],
//         }}
//         width={Dimensions.get('window').width - 16} // from react-native
//         height={220}
//         yAxisLabel={'$'}
//         chartConfig={{
//           backgroundColor: '#1cc910',
//           backgroundGradientFrom: '#eff3ff',
//           backgroundGradientTo: '#efefef',
//           decimalPlaces: 2, // optional, defaults to 2dp
//           color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         bezier
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//       {/*Example of LineChart*/}
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 18,
//           padding: 16,
//           marginTop: 16,
//         }}>
//         Line Chart
//       </Text>
//       <LineChart
//         data={{
//           labels: [
//             'January',
//             'February',
//             'March',
//             'April',
//             'May',
//             'June',
//           ],
//           datasets: [
//             {
//               data: [20, 45, 28, 80, 99, 43],
//               strokeWidth: 2,
//             },
//           ],
//         }}
//         width={Dimensions.get('window').width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#1cc910',
//           backgroundGradientFrom: '#eff3ff',
//           backgroundGradientTo: '#efefef',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//       {/*Example of Progress Chart*/}
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 18,
//           padding: 16,
//           marginTop: 16,
//         }}>
//         Progress Chart
//       </Text>
//       <ProgressChart
//         data={[0.4, 0.6, 0.8]}
//         width={Dimensions.get('window').width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#1cc910',
//           backgroundGradientFrom: '#eff3ff',
//           backgroundGradientTo: '#efefef',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//       {/*Example of Bar Chart*/}
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 18,
//           padding: 16,
//           marginTop: 16,
//         }}>
//         Bar Chart
//       </Text>
//       <BarChart
//         data={{
//           labels: [
//             'January',
//             'February',
//             'March',
//             'April',
//             'May',
//             'June',
//           ],
//           datasets: [
//             {
//               data: [20, 45, 28, 80, 99, 43],
//             },
//           ],
//         }}
//         width={Dimensions.get('window').width - 16}
//         height={220}
//         yAxisLabel={'$'}
//         chartConfig={{
//           backgroundColor: '#1cc910',
//           backgroundGradientFrom: '#eff3ff',
//           backgroundGradientTo: '#efefef',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//       {/*Example of StackedBar Chart*/}
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 18,
//           padding: 16,
//           marginTop: 16,
//         }}>
//         Stacked Bar Chart
//       </Text>
//       <StackedBarChart
//         data={{
//           labels: ['Test1', 'Test2'],
//           legend: ['L1', 'L2', 'L3'],
//           data: [[60, 60, 60], [30, 30, 60]],
//           barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
//         }}
//         width={Dimensions.get('window').width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#1cc910',
//           backgroundGradientFrom: '#eff3ff',
//           backgroundGradientTo: '#efefef',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//       {/*Example of Pie Chart*/}
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 18,
//           padding: 16,
//           marginTop: 16,
//         }}>
//         Pie Chart
//       </Text>
//       <PieChart
//         data={[
//           {
//             name: 'Seoul',
//             population: 21500000,
//             color: 'rgba(131, 167, 234, 1)',
//             legendFontColor: '#7F7F7F',
//             legendFontSize: 15,
//           },
//           {
//             name: 'Toronto',
//             population: 2800000,
//             color: '#F00',
//             legendFontColor: '#7F7F7F',
//             legendFontSize: 15,
//           },
//           {
//             name: 'New York',
//             population: 8538000,
//             color: '#ffffff',
//             legendFontColor: '#7F7F7F',
//             legendFontSize: 15,
//           },
//           {
//             name: 'Moscow',
//             population: 11920000,
//             color: 'rgb(0, 0, 255)',
//             legendFontColor: '#7F7F7F',
//             legendFontSize: 15,
//           },
//         ]}
//         width={Dimensions.get('window').width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#1cc910',
//           backgroundGradientFrom: '#eff3ff',
//           backgroundGradientTo: '#efefef',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//         accessor="population"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         absolute //for the absolute number remove if you want percentage
//       />
//       {/*Example of Contribution Chart*/}
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 18,
//           padding: 16,
//           marginTop: 16,
//         }}>
//         Contribution Graph
//       </Text>
//       <ContributionGraph
//         values={[
//           { date: '2019-01-02', count: 1 },
//           { date: '2019-01-03', count: 2 },
//           { date: '2019-01-04', count: 3 },
//           { date: '2019-01-05', count: 4 },
//           { date: '2019-01-06', count: 5 },
//           { date: '2019-01-30', count: 2 },
//           { date: '2019-01-31', count: 3 },
//           { date: '2019-03-01', count: 2 },
//           { date: '2019-04-02', count: 4 },
//           { date: '2019-03-05', count: 2 },
//           { date: '2019-02-30', count: 4 },
//         ]}
//         endDate={new Date('2019-04-01')}
//         numDays={105}
//         width={Dimensions.get('window').width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#1cc910',
//           backgroundGradientFrom: '#eff3ff',
//           backgroundGradientTo: '#efefef',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//       />
//     </View>
//   </View>
// </ScrollView>




// <ProgressChart
//   data="{data}"
//   width="{screenWidth}"
//   height="{220}"
//   chartConfig="{chartConfig}"
// />


// <IconButton
//       mode="contained"
//       style={styles.circularButton}
//       color={Colors.white}
//       icon={require('../../assets/plus.png')}
//       size={60}
//       onPress={() => this.props.navigation.navigate('Login')}>
// </IconButton>
