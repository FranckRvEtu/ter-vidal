import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button} from 'react-native';
import axios from 'axios';
import PatientItem from './patientItem';
import Header from './header';
import Ordonnance from '../screens/ordonnance';
import Juif from '../screens/flavio';


export default function ListePatient({navigation}) {
    const [patients, setPatients] = useState([]);

    const fetchPatient = async () => {
      try {
        const patient = await axios.get('http://192.168.226.157:11000/allPatients');
        const data = patient.data;
        console.log("fetch fini");
        setPatients(data);
      }catch (error) {
        console.error(error);
  
      }
    };
  
    useEffect(() => {
      fetchPatient();
    }
    ,[]);
  
    // pressHandler = (firstname, name) => {
    //     console.log('Patient', firstname, name, 'pressed');
    //     navigation.navigate('Ordonnance', );
    // };

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <View style = {styles.content}>
            <FlatList 
                data={patients}

                keyExtractor={item => item._id}
                renderItem={({item}) => (
                    <PatientItem patient={item} pressHandler = {() => navigation.navigate('Ordonnance',item)}/>
                )}
            />
        </View>
      </View>
    );


    // const [patients, setPatients] = useState();
    // useEffect(() => {
    //     setPatients(patientsInitiaux);
    // }, [patientsInitiaux]);

    // pressHandler = (_id) => {
    //     console.log('Patient', _id, 'pressed');
    // }

    // return (
    //     <View >
    //         <Text style={styles.title}>Liste des patients</Text>
    //         <View>
    //             <FlatList 
    //                 data={patients}

    //                 keyExtractor={item => item._id}
    //                 renderItem={({item}) => (
    //                     <PatientItem patient={item} pressHandler = {pressHandler}/>
    //                 )}
    //             />
    //         </View>
    //     </View>
    // )
}
const styles = StyleSheet.create({
    title: {
        fontSize:30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
});