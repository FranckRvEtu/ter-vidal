import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function PatientItem({patient, pressHandler}) {

    return (
        <TouchableOpacity onPress={()=>pressHandler(patient.firstname, patient.name)}>
            <View style={styles.patient}>
                <Text>{patient.firstname}                  {patient.BloodType}          {patient.height}cm</Text>
                <Text>{patient.name}                       {patient.weight}kg</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({  
    patient: {
        margin: 20,
        padding: 16,
        borderColor: '#4C834E',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10
    }
});