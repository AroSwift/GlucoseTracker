import * as React from 'react';
import {
  Text, Button, Surface, Provider as PaperProvider
} from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { DataTable } from 'react-native-paper';

import '../stylesheets/Main.css';
import { firebase } from '../config.js';

export default class PatientListScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      patients_uids: [],
      patients_data: [],
      user_id_indexes: [],
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
      let doc_user_uid = await AsyncStorage.getItem('@GlucoseTracker:user_uid');

      if(this.props.show_all === true) {

        await firebase.firestore().collection('users').get()
          .then(snapshot => {
            var user_ids = []
            snapshot.forEach(doc => {
              user_ids.push(doc.data());
            });

            this.setState({ values: user_ids });
          });

          return Promise.all(this.state.values);
      } else { // When we should only show some of the users
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

          let user_id_indexes = [];

          let values = await this.state.patients_uids.map(item => {
            return firebase.firestore().collection('users').doc(item).get().then(doc => {
              user_id_indexes.push(doc.id);
              return doc.data();
            });
          });

          this.setState({ user_id_indexes: user_id_indexes });

          return Promise.all(values);
      }
    } catch (error) {
      console.log(error);
    }
  }

  goToIndividualPatient(auth_id) {
    this.props.on_handle_patient_auth_id(auth_id);
    this.props.on_handle_current_page('patient_data');
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
            <DataTable.Cell>
              <Button mode="contained"
                onPress={() => this.goToIndividualPatient(this.state.user_id_indexes[index])}>
                View Patient Data
              </Button>
            </DataTable.Cell>
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
              <DataTable.Title>Patient Actions</DataTable.Title>
            </DataTable.Header>

            {this.render_table()}

          </DataTable>
        </Surface>
      </PaperProvider>
    );
  }
}
