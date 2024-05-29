import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import Header from '../components/header';
import RdvItem from '../components/rdvItem';

export default function HomePage({navigation}){

    return (
        <View>
            <StatusBar style="auto" />
            <Header />
            <Button title='ACCÉDER AUX PATIENTS' onPress={()=>navigation.navigate('Patients')} />
            <Button title='ACCÉDER AUX RENDEZ-VOUS' onPress={()=>navigation.navigate('RDV')} />
        </View>
    )
}

const styles = StyleSheet.create({  
    button: {
        margin: 20,
        padding: 16,
        borderColor: '#4C834E',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10
    }
});