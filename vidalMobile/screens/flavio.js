import React, { useState,useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Header from '../components/header';
import 'react-native-get-random-values';
import { Audio } from 'expo-av';

import { SpeechRecognizer, SpeechConfig, AudioConfig } from 'microsoft-cognitiveservices-speech-sdk';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';


const speechConfig = SpeechConfig.fromSubscription('f073359abb1242c3b5a1b8aa4b8f2ac4', 'francecentral');



export default function Flavio({ navigation }) {
  const [recognizer, setRecognizer] = useState(null);
  const [isListening, setIsListening] = useState(false);
  useEffect(() => {

    

    speechConfig.speechRecognitionLanguage = 'fr-FR';
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    

    const newRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    newRecognizer.recognized = (_, event) => {
      const text = event.result.text;
      console.log(text);
    };

    setRecognizer(newRecognizer); // Affecter le recognizer à la variable d'état

    return () => {
      newRecognizer.close();
    };
  }, []);
  const toggleListening = () => {
    if (!recognizer) {
      console.error('Recognizer is not initialized.');
      return;
    }

    if (isListening) {
      recognizer.stopContinuousRecognitionAsync(() => {
        console.log('Speech recognition stopped.');
        setIsListening(false);
      }, (error) => {
        console.error('Error stopping speech recognition:', error);
      });
    } else {
      recognizer.startContinuousRecognitionAsync(async () => {
        
        console.log('Speech recognition started.');
        setIsListening(true);
      }, (error) => {
        console.error('Error starting speech recognition:', error);
      });
    }
  };


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Button title={isListening ? "Arrêter" : "Démarrer"} onPress={toggleListening}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20, // Espacement supplémentaire du haut
  },
});
