import React, { useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const Speech = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  let recognizer;
  const startRecording = async () => {
    
    try {
      const speechConfig = sdk.SpeechConfig.fromSubscription('60bb52b3a0d94c52b29930cee315c219', 'francecentral');
      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      speechConfig.speechRecognitionLanguage = 'fr-FR'; // Définir la langue française


      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
      recognizer.recognized = (_, event) => {
        setTranscript(event.result.text);
      };

      setIsRecording(true);
      await recognizer.startContinuousRecognitionAsync();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recognizer.stopContinuousRecognitionAsync();
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <div>
        <h3>Transcript:</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default Speech;
