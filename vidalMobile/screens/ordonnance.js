import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, FlatList} from 'react-native';
import axios from 'axios';
import Header from '../components/header';

export default function Ordonnance({navigation}){
    const [medicament, setMedicament] = useState('');
    const [posologie, setPosologie] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const [prescriptions, setPrescriptions] = useState([]);
    const idPatient = navigation.getParam('_id');

    useEffect(() => {
        console.log(prescriptions);
    }, [prescriptions]);

    prescriptionHandler = () => {
        console.log(medicament);
        console.log(posologie);
        console.log(commentaire);
        const prescription = {
            Medicament: medicament,
            Posologie: posologie,
            Remarque: commentaire,
            
        };
        console.log(prescription);
        setMedicament('');
        setPosologie('');
        setCommentaire('');
        setPrescriptions([...prescriptions, prescription]);
    }

    deleteHandler = (index) =>{
        console.log('Delete');
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions.splice(index,1);
        setPrescriptions(updatedPrescriptions);
    }

    const handleCreateOrdo = async () => {
        try {
          const responsePre = await fetch("http://192.168.1.7:3013/addManyPrescriptions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prescriptions
            })
          });
          if (responsePre.ok) {
            const data = await responsePre.json();
            console.log("Prescriptions ajoutées avec succès");
            console.log("AddPresc",data);
    
            const response = await fetch("http://192.168.1.7:3000/addOrdonnance", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                date: new Date(),
                idPatient: navigation.getParam('_id'),
                prescriptions: data,
              }),
            });
            if (response.ok) {
              const dataOrdo = await response.json();
              console.log("Ordonnance créée avec succès");
              console.log("AddOrdo",dataOrdo);
                navigation.goBack();
            } else {
              console.error("Failed to create ordonnance");
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

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
            <TouchableOpacity style={styles.button} onPress={prescriptionHandler}>
                <Text style={styles.text}>Rajouter une prescription</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreateOrdo}>
                <Text style={styles.text}>Valider l'ordonnance</Text>
            </TouchableOpacity>

            <FlatList
                data={prescriptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                    <View style={styles.listContainer}>
                        <Text style={styles.textPrescription}>{item.medicament}</Text>
                        <Text style={styles.textPrescription}>{item.posologie}</Text>
                        <Text style={styles.textPrescription}>{item.commentaire}</Text>
                        <TouchableOpacity style={styles.buttonSup} onPress={() => deleteHandler(index)}>
                            <Text style = {styles.text}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
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
    },
    listContainer : {
        margin: 20,
        padding: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10
    },
    textPrescription: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 15
    },
    buttonSup: {
        padding: 10,
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10
    }
});