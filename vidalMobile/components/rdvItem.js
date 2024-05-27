import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';


export default function RdvItem({rdv}) {
    const [patient, setPatient] = useState([]);

    const fetchPatient = async () => {
        try {
            const patient = await axios.get('http://192.168.226.157:11000/getPatient/'+rdv.idPatient);
            const data = patient.data;

            console.log("patient "+data.firstname+""+data.name+" recup");
            setPatient(data);
        }catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        if (patient.length === 0){
            fetchPatient();
        }
    }), [];

    function getMonthName(month) {
        switch (month) {
        case 1:
            return 'Janvier';
        case 2:
            return 'Février';
        case 3:
            return 'Mars';
        case 4:
            return 'Avril';
        case 5:
            return 'Mai';
        case 6:
            return 'Juin';
        case 7:
            return 'Juillet';
        case 8:
            return 'Août';
        case 9:
            return 'Septembre';
        case 10:
            return 'Octobre';
        case 11:
            return 'Novembre';
        case 12:
            return 'Décembre';
        default:
            return '';
        }
    }

    const date = new Date(rdv.date);
    const year = date.getFullYear();
    const month = getMonthName(date.getMonth()+1);
    const day = date.getDate();
    return (
        <TouchableOpacity onPress={()=>console.log("Rdv avec "+patient.firstname+" "+patient.name)}>
            <View style={styles.rdv}>
                <Text>{patient.firstname}                    {day+" "+month+" "+year}</Text>
                <Text>{patient.name}                       {rdv.lieu}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({  
    rdv: {
        margin: 20,
        padding: 16,
        borderColor: '#4C834E',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10
    }
});