import * as React from 'react';
import {
  Text, Surface, Provider as PaperProvider
} from 'react-native-paper';
import { DataTable } from 'react-native-paper';

import '../stylesheets/Main.css';
import { firebase } from '../config.js';

export default class PatientListScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      patients_uids: [],
      patients_data: [],
      values: [],
    };
  }

  componentDidMount() {
    this.set_patient_data().then(result =>
      this.setState({ patients_data: result })
    )
  }

  async set_patient_data() {
    try {
      await firebase.firestore().collection('doctors').get()
        .then(snapshot => {
          var user_ids = []
          snapshot.forEach(doc => {
            user_ids.push(doc.data());
          });

          this.setState({ values: user_ids });
        });

        return Promise.all(this.state.values);
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
          <Text className="patientListHeader">Doctors List</Text>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>First Name</DataTable.Title>
              <DataTable.Title>Last Name</DataTable.Title>
              <DataTable.Title>Auth UID</DataTable.Title>
            </DataTable.Header>

            {this.render_table()}
            
          </DataTable>
        </Surface>
      </PaperProvider>
    );
  }
}


// If we want to implement pagination later:
// <DataTable.Pagination
//   page={1}
//   numberOfPages={3}
//   onPageChange={(page) => { console.log(page); }}
//   label="1-2 of 6"
// />
