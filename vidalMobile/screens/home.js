import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Header from '../components/header';
import RdvItem from '../components/rdvItem';

export default function HomePage(){
    const [rdvs, setRdvs] = useState([]);

    const fetchUpcomingRDVs = async () => {
        try {
            const rdv = await axios.get('http://192.168.226.157:5000/getUpcomingRDVs');
            const data = rdv.data;
            console.log("fetch fini : "+data.length);
            setRdvs(data);
            // for (const rdv of rdvs) {
            //     const patient = await axios.get('http://192.168.226.157:11000/getPatient/'+rdv.idPatient);
            //     const data = patient.data;
            //     console.log("patient "+data.firstname+" "+data.name+" recup");
            //     const obj = {id: rdv._id, data: data};
            //     setPatients({...patients, obj});
            // }
        }catch(error){
            console.error(error);
        }
    };



    useEffect(() => {
        if (rdvs.length === 0) {
            fetchUpcomingRDVs();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Gros test" onPress={()=>console.log("Bouton Test : "+rdvs.length)} />
            <StatusBar style="auto" />
            <Header />
            <FlatList 
                data = {rdvs}
                keyExtractor={item=>item._id}
                renderItem={({item}) => (
                    <RdvItem rdv={item} />
                )}
            
            />
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