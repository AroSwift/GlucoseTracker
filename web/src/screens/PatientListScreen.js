import * as React from 'react';
import {
  Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { DataTable } from 'react-native-paper';
import { FlatList } from 'react-native';

import '../stylesheets/Main.css';
import { firebase } from '../config.js';

// TODO: add date picker after blood glucose level
export default class GlucoseScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      patients_uids: [],
      patients_data: [],
    };

    // this.set_patient_data();
    this.fetch_data();
  }

  fetch_data() {
    this.set_patient_data().then((data) => {
        console.log(`channel required: ${data}`);
    });
  }

  async set_patient_data() {
    try {
      let doc_user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');

      let user_docs = firebase.firestore().collection('user_doctors');
      await user_docs.where('doctor_id', '==', doc_user_uid).get()
        .then(snapshot => {
          var user_ids = []
          snapshot.forEach(doc => {
            user_ids.push(doc.data().user_id);
          });
          // console.log('patients_uids:', user_ids);

          // When the doctor has patients
          if(user_ids.length > 0) {
            this.setState({ patients_uids: user_ids });
          }
        });

        let fetched_patient_data = []
        await this.state.patients_uids.forEach(function myFunction(item) {
          firebase.firestore().collection('users').doc(item).get().then(doc => {
            console.log(doc.data());

            fetched_patient_data.push(doc.data());
          });
        });

        return fetched_patient_data;
        // this.setState({ patients_data: fetched_patient_data });


        // console.log(this.state.patients_data);

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

            <FlatList
              data={this.state.patients_data}
              renderItem={({ item }) => (
                <DataTable.Row>
                  <DataTable.Cell>{item.first_name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.last_name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.address}</DataTable.Cell>
                </DataTable.Row>
              )}
              keyExtractor={item => item.auth_uid}
            />

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
