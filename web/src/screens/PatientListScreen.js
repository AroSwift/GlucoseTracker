import * as React from 'react';
import {
  Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { DataTable } from 'react-native-paper';

import '../stylesheets/Main.css';
import { firebase } from '../config.js';

export default class GlucoseScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      patients_uids: [],
      patients_data: [],
    };
  }

  componentDidMount() {
    this.set_patient_data().then(result =>
      this.setState({ patients_data: result })
    )
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

          // When the doctor has patients
          if(user_ids.length > 0) {
            this.setState({ patients_uids: user_ids });
          }
        });

        let values = await this.state.patients_uids.map(item => {
          return firebase.firestore().collection('users').doc(item).get().then(doc => {
            // console.log(doc.data());
            return doc.data();
          });
        });


        return Promise.all(values);
    } catch (error) {
      console.log(error);
    }
  }

  render_table() {
    try {

      console.log('RENDER_TABLE ', this.state.patients_data);

      return this.state.patients_data.map((item, index) => {
        console.log(item);

        return (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.first_name}</DataTable.Cell>
            <DataTable.Cell>{item.last_name}</DataTable.Cell>
            <DataTable.Cell>{item.auth_uid}</DataTable.Cell>
          </DataTable.Row>
        );
      });
    } catch (err) {
      return null;
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
              <DataTable.Title>Auth UID</DataTable.Title>
            </DataTable.Header>

            {this.render_table()}

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
