import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Container,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import io from "socket.io-client";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import enrollProfile from '../../../enroll.js';

const enrollFile = "/files/Enregistrement.wav"
const speechConfig = sdk.SpeechConfig.fromSubscription('60bb52b3a0d94c52b29930cee315c219', 'francecentral');

function Ordonnance2() {
  const [isListening, setIsListening] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicament, setMedicament] = useState("");
  const [posologie, setPosologie] = useState("");
  const [recognizer, setRecognizer] = useState(null); // Variable d'état pour recognizer
  const [remarque, setRemarque] = useState("");
  useEffect(() => {
    const socket = io("http://192.168.1.32:5000");

    socket.on("transcribedText", (text) => {
      console.log(text);

      if (/(médicament|médicaments|Médicament|Médicaments)/gi.test(text)) {
        const modifiedString = text.replace(
          /(médicament|médicaments|Médicament|Médicaments)/gi,
          ""
        );
        console.log("medoc:" + modifiedString);
        document.getElementById("Medicament").value += modifiedString;
      }
    });

    speechConfig.speechRecognitionLanguage = 'fr-FR';
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    

    const newRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    newRecognizer.recognized = (_, event) => {
      const text = event.result.text;
      console.log(text);

      if (/(médicament|médicaments|Médicament|Médicaments)/gi.test(text)) {
        const modifiedString = text.replace(
          /(médicament|médicaments|Médicament|Médicaments)/gi,
          ""
        );
        console.log("medoc:" + modifiedString);
        setMedicament((currentValue) => `${currentValue} ${modifiedString}`);    }  
      if (/(posologie|posologies)/gi.test(text)) {
        const modifiedString = text.replace(
          /(posologie|posologies|Posologies|Posologie)/gi,
          ""
        );
        console.log("poso:" + modifiedString);
        setPosologie((currentValue) => `${currentValue} ${modifiedString}`);      }
      if (/(commentaire|commentaires)/gi.test(text)) {
        const modifiedString = text.replace(
          /(commentaire|commmentaires|Commentaires|Commentaire)/gi,
          ""
        );
        console.log("comment:" + modifiedString);
        setRemarque((currentValue) => `${currentValue} ${modifiedString}`);      }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3013/addPrescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Medicament: medicament,
          Posologie: posologie,
          Remarque: remarque,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Prescription ajoutée avec succès");

        setPrescriptions([...prescriptions, data]);

        setMedicament("");
        setPosologie("");
        setRemarque("");
      } else {
        console.error("Failed to add prescription");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateOrdo = async () => {
    try {
      const response = await fetch("http://localhost:3000/addOrdonnance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date(),
          idPatient: "60d6b2e4d0a3e4c4d0c7a7b7",
          prescriptions: prescriptions,
        }),
      });
      if (response.ok) {
        console.log("Ordonnance créée avec succès");
      } else {
        console.error("Failed to create ordonnance");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Nom patient Concerné
      </Typography>
      <form onSubmit={handleSubmit} id="ordonnance-form">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Médicament"
              variant="outlined"
              value={medicament}
              onChange={(e) => setMedicament(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Posologie"
              variant="outlined"
              value={posologie}
              onChange={(e) => setPosologie(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarque"
              variant="outlined"
              multiline
              rows={3}
              value={remarque}
              onChange={(e) => setRemarque(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              AJOUTER
            </Button>
            <IconButton
              onClick={toggleListening}
              color={isListening ? "primary" : "default"}
            >
              {isListening ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </form>

      <Button variant="contained" onClick={handleCreateOrdo} sx={{ mt: 2 }}>
        Créer Ordo
      </Button>

      {prescriptions.length > 0 && (
        <Card sx={{ mt: 2, overflow: "auto", maxHeight: 300 }}>
          {" "}
          <CardContent>
            <Typography variant="h6">Prescriptions ajoutées :</Typography>
            <List>
              {prescriptions.map((prescription, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`Médicament: ${prescription.Medicament}`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Posologie: {prescription.Posologie}
                          </Typography>
                          {prescription.Remarque && (
                            <Box component="div" sx={{ mt: 1 }}>
                              Remarque: {prescription.Remarque}
                            </Box>
                          )}
                        </>
                      }
                    />
                    <CardActions>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => console.log("Delete prescription")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </ListItem>
                  {index < prescriptions.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default Ordonnance2;
