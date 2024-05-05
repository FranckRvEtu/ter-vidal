import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button} from 'react-native';
import axios from 'axios';
import PatientItem from './patientItem';


export default function ListePatient({patientsInitiaux}) {
    const [patients, setPatients] = useState(patientsInitiaux);
    useEffect(() => {
        setPatients(patientsInitiaux);
    }, [patientsInitiaux]);

    pressHandler = (_id) => {
        console.log('Patient', _id, 'pressed');
    }

    return (
        <View >
            <Text style={styles.title}>Liste des patients</Text>
            <View>
                <FlatList 
                    data={patients}

                    keyExtractor={item => item._id}
                    renderItem={({item}) => (
                        <PatientItem patient={item} pressHandler = {pressHandler}/>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize:30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
});