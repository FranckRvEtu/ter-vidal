import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Header from '../components/header';

export default function Ordonnance({navigation}){
    const [medicament, setMedicament] = useState('');
    const [posologie, setPosologie] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const idPatient = navigation.getParam('_id');

    return (
        <View>
            <Header />
            <Text style = {styles.text}>{navigation.getParam('firstname')} {navigation.getParam('name')}</Text>
            <TextInput 
                value={medicament}
                style={styles.input}
                placeholder='Medicament'
                onChangeText={(medoc) => setMedicament(medoc)}
            />
            <TextInput 
                value={posologie}
                style={styles.input}
                placeholder='Posologie'
                onChangeText={(poso) => setPosologie(poso)}
            />
            <TextInput 
                value={commentaire}
                style={styles.input}
                placeholder='Commentaire'
                onChangeText={(com) => setCommentaire(com)}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log(medicament);
                console.log(posologie);
                console.log(commentaire);
                setMedicament('');
                setPosologie('');
                setCommentaire('');
                }}>
                <Text style={styles.text}>Rajouter une prescription</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 20,
        padding: 16,
        borderColor: '#4C834E',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10
    },
    button: {
        margin: 20,
        padding: 16,
        backgroundColor: '#4C834E',
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10
    },
    text : {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});