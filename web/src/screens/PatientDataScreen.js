import * as React from 'react';
import {
  Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import { TimeSeries, Index } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import '../stylesheets/Main.css';
import { firebase } from '../config.js';

export default class PaatientDataScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      patients_data: [],
      data: [["2019-01-24T00:00", 0.00]], // Default
    };

    console.log(this.props.patient_auth_id);
  }

  componentDidMount() {
    this.set_patient_data();
  }

  async set_patient_data() {
    await firebase.firestore().collection('meal')
      .where('user_id', '==', this.props.patient_auth_id).get()
      .then(snapshot => {
        var meals = []
        snapshot.forEach(doc => {
          let d = doc.data();
          let date = d['year'].toString() + "-" + d['month'].toString() + "-" + d['day'] + "T00:00";
          let calories = d['calories'].replace('kJ','');
          calories = d['calories'].replace('kcal','');
          calories = parseInt(calories);

          meals.push([date, calories]);
        });

        console.log(meals);

        meals = meals.sort(function(a, b) {
          if (a[0] === b[0]) {
            return 0;
          } else {
            return (a[0] < b[0]) ? -1 : 1;
          }
        });

        console.log(meals);

        this.setState({ data: meals });
      });
  }

  render() {

    const data = this.state.data;

    const series = new TimeSeries({
      name: "calories",
      columns: ["index", "calories"],
      points: data.map(([d, value]) => [
          Index.getIndexString("1h", new Date(d)),
          value
      ])
  });

    return (
      <PaperProvider>
        <Surface className="patientListContainer">
          <Text className="patientListHeader">Patient Data</Text>
          <ChartContainer timeRange={series.range()} >
            <ChartRow height="200">
              <YAxis
                id="nutrition"
                label="Calories (grams)"
                min={0}
                max={1000}
                width="60"
                type="linear"
              />
              <Charts>
                <LineChart
                  axis="nutrition"
                  spacing={1}
                  columns={["calories"]}
                  series={series}
                />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Surface>
      </PaperProvider>
    );
  }
}
