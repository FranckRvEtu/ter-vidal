import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Header from '../components/header';

export default function Flavio({navigation}){
    return(
        <View>
            <Header />
            <Text>Flavio</Text>
        </View>
    )
}