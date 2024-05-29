import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import Header from '../components/header';
import RdvItem from '../components/rdvItem';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 46) / 2; // Ajuster la taille en fonction de votre préférence

export default function HomePage() {
    const [rdvs, setRdvs] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const fetchUpcomingRDVs = async () => {
        try {
            const rdv = await axios.get('http://172.20.10.2:5000/getUpcomingRDVs');
            const data = rdv.data;
            console.log("fetch fini : " + data.length);
            setRdvs(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (rdvs.length === 0) {
            fetchUpcomingRDVs();
        }
    }, []);

    const toggleRefresh = () => {
        setRefresh(!refresh);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header />
            <FlatList
                data={rdvs}
                keyExtractor={item => item._id}
                style={{ flex: 1}}
                
                extraData={refresh}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <RdvItem rdv={item} />
                    </View>
                )}
                columnWrapperStyle={styles.columnWrapperStyle}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH, // Pour garder un carré
        marginVertical: 8, // Réduire l'écart vertical
        marginHorizontal: 9, // Ajuster la marge horizontale
        
        borderRadius: 0,
        overflow: 'hidden', // Pour s'assurer que le contenu ne dépasse pas les bords arrondis
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
    },
});
