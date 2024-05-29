import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import axios from 'axios';

export default function RdvItem({ rdv }) {
    const [patient, setPatient] = useState([]);

    const fetchPatient = async () => {
        try {
            const response = await axios.get(`http://172.20.10.2:11000/getPatient/${rdv.idPatient}`);
            const data = response.data;
            console.log("patient " + data.firstname + " " + data.name + " recup");
            setPatient(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (patient.length === 0) {
            fetchPatient();
        }
    }, []);

    function getMonthName(month) {
        switch (month) {
            case 1: return 'Janvier';
            case 2: return 'Février';
            case 3: return 'Mars';
            case 4: return 'Avril';
            case 5: return 'Mai';
            case 6: return 'Juin';
            case 7: return 'Juillet';
            case 8: return 'Août';
            case 9: return 'Septembre';
            case 10: return 'Octobre';
            case 11: return 'Novembre';
            case 12: return 'Décembre';
            default: return '';
        }
    }

    const date = new Date(rdv.date);
    const year = date.getFullYear();
    const month = getMonthName(date.getMonth() + 1);
    const day = date.getDate();

    return (
        <TouchableOpacity onPress={() => console.log("Rdv avec " + patient.firstname + " " + patient.name)}>
            <View style={styles.rdv}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{`${patient.firstname} ${patient.name}`}</Text>
                    <Text style={styles.text}>{`${rdv.lieu}`}</Text>
                    <Text style={styles.text}>{`${day} ${month} `}</Text>

                </View>
                <Image source={require('../assets/sabl.png')} style={styles.icon} />

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    rdv: {
        margin: 10,
        padding: 16,
        width: 150, // Adjusted width
        height: 150,
        borderColor: 'white',
        backgroundColor: "#579C5F",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
    },
    textContainer: {
        borderColor: 'white',
        backgroundColor: "white",
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        height: '80%', // Setting height explicitly
    },
    text: {
        color: '#579C5F',
        marginBottom: 5, 
        fontWeight: 'bold', // Utilisez fontWeight pour le gras
        textAlign: 'center',// Align text to the left
        fontFamily:'Calibri'
    },
    icon: {
        width: 20,  // Définissez la largeur de l'icône
        height: 20, // Définissez la hauteur de l'icône
        alignSelf: 'center', // Centre horizontalement l'icône
        marginTop: 10, // Espace entre le rectangle et l'icône
    }
});
