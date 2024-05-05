import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button} from 'react-native';
import Header from './components/header';
import axios from 'axios';
import ListePatient from './components/listePatient';
import Navigator from './routes/homeStack';

export default function App() {

  return (

    <Navigator />

  )



  // const [patients, setPatients] = useState([]);

  // const fetchPatient = async () => {
  //   try {
  //     const patient = await axios.get('http://192.168.1.7:11000/allPatients');
  //     const data = patient.data;
  //     setPatients(data);
  //   }catch (error) {
  //     console.error(error);

  //   }
  // };

  // useEffect(() => {
  //   fetchPatient();
  // }
  // ,[]);

  // return (
  //   <View style={styles.container}>
  //     <StatusBar style="auto" />
  //     <Header />
  //     <View style = {styles.content}>
  //       <ListePatient patientsInitiaux={patients} />
  //     </View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
