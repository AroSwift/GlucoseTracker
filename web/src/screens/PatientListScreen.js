import * as React from 'react';
import {
  Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { DataTable } from 'react-native-paper';

import '../stylesheets/Main.css';
import { firebase } from '../config.js';

export class DataTableRow extends React.Component {
  render() {
    try {
      var table = [];

      this.props.data.forEach(function myFunction(item) {
        table.push(
          <DataTable.Row>
            <DataTable.Cell>{item.first_name}</DataTable.Cell>
            <DataTable.Cell>{item.last_name}</DataTable.Cell>
            <DataTable.Cell>{item.address}</DataTable.Cell>
          </DataTable.Row>
        );
      });
      return table;
    } catch (err) {
      return null;
    }
  }
}

// TODO: add date picker after blood glucose level
export default class GlucoseScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      patients_uids: [],
      patients_data: [],
    };
  }

  async componentDidMount() {





    let doc_user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');

    let user_docs = firebase.firestore().collection('user_doctors');
    user_docs.where('doctor_id', '==', doc_user_uid).get()
      .then(snapshot => {
        var user_ids = []
        snapshot.forEach(doc => {
          user_ids.push(doc.data().user_id);
        });

        // When the doctor has patients
        if(user_ids.length > 0) {
          this.setState({ patients_uids: user_ids });
        }
      });

      console.log(this.state.patients_uids);

      let fetched_patient_data = []
      this.state.patients_uids.forEach(function myFunction(item) {
        firebase.firestore().collection('users').doc(item).get().then(doc => {
          console.log(doc.data());

          fetched_patient_data.push(doc.data());
        });
      });









    this.setState({ patients_data: this.set_patient_data() });
    console.log('Mounted ', this.state.patients_data);
  }

  async set_patient_data() {
    try {
      let doc_user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');

      let user_docs = firebase.firestore().collection('user_doctors');
      user_docs.where('doctor_id', '==', doc_user_uid).get()
        .then(snapshot => {
          var user_ids = []
          snapshot.forEach(doc => {
            user_ids.push(doc.data().user_id);
          });

          // When the doctor has patients
          if(user_ids.length > 0) {
            this.setState({ patients_uids: user_ids });
          }
        });

        let fetched_patient_data = []
        this.state.patients_uids.forEach(function myFunction(item) {
          firebase.firestore().collection('users').doc(item).get().then(doc => {
            console.log(doc.data());

            fetched_patient_data.push(doc.data());
          });
        });

        return fetched_patient_data;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <PaperProvider>
        <Surface className="patientListContainer">
          <Text className="patientListHeader">Patients List</Text>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>First Name</DataTable.Title>
              <DataTable.Title>Last Name</DataTable.Title>
              <DataTable.Title>Address</DataTable.Title>
            </DataTable.Header>

            <DataTableRow data={this.state.patients_data} />

            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => { console.log(page); }}
              label="1-2 of 6"
            />
          </DataTable>
        </Surface>
      </PaperProvider>
    );
  }
}
