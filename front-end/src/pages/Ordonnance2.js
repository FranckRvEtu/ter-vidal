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
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import * as fs from 'fs';

const enrollFiles = ["/files/Franck.wav", "/files/Franck_2_.wav","/files/Franck_3_.wav",]
const speechConfig = sdk.SpeechConfig.fromSubscription('47c0c6c8a1d148a29e68ee9a135ad253', 'francecentral');
const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

const client = new sdk.VoiceProfileClient(speechConfig);
speechConfig.speechRecognitionLanguage = 'fr-FR';


const getAudioConfigFromFile = function (file) {
  return sdk.AudioConfig.fromWavFileInput(fs.readFileSync(file));
};


fetch("https://francecentral.api.cognitive.microsoft.com/speaker-recognition/verification/text-independent/profiles?api-version=2021-09-05", {
  method: "POST",
  headers: {
    "Ocp-Apim-Subscription-Key": "ff4beaca1cfe4929a8c4a1ed21048015"
  },
  body: JSON.stringify({
    locale: "fr-FR"
  })
})
.then((response) => {
  if (response.ok) {
    console.log("Profile created");
  } else {
    console.error("Failed to create profile");
  }
})

/*console.log("Profile id: " + profile.profileId +" created, now enrolling using files beginning with: " + enrollFiles[0]);
for (const enrollFile of enrollFiles) {
  const enrollConfig = getAudioConfigFromFile(enrollFile);
  const enrollResult = await client.enrollProfileAsync(profile, enrollConfig);
  console.log("(Enrollment result) Reason: " + sdk.ResultReason[enrollResult.reason]); 
}
const model = sdk.SpeakerVerificationModel.fromProfile(profile);
 */
function Ordonnance2() {
  const [isListening, setIsListening] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicament, setMedicament] = useState("");
  const [posologie, setPosologie] = useState("");
  const [recognizer, setRecognizer] = useState(null); // Variable d'état pour recognizer
  const [speaker, setSpeaker] = useState(null); // Variable d'état pour speaker
  const [remarque, setRemarque] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:3001");

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
    
    

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    console.log("Recognizer created");
    const speaker = new sdk.SpeakerRecognizer(speechConfig, audioConfig);
    console.log("Speaker created");

      /*if (/(médicament|médicaments|Médicament|Médicaments)/gi.test(text)) {
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
        setRemarque((currentValue) => `${currentValue} ${modifiedString}`);      }*/

    setRecognizer(recognizer); // Affecter le recognizer à la variable d'état
    setSpeaker(speaker); // Affecter le speaker à la variable d'état

    return () => {
      recognizer.close();
    };
  }, []);

  /*const verification = async () => {
    const result = await speaker.recognizeOnceAsync(model);
    const reason = result.reason;
    if (reason === ResultReason.Verified) {
      console.log("(Verification result) Profile Id: " + result.profileId); 
      console.log("(Verification result) Score: " + result.score);
    }
    return result.score;
  }*/

  const toggleListening = () => {
    if (!recognizer||!speaker) {
      console.error('Recognizer or Speaker is not initialized.');
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
      recognizer.startContinuousRecognitionAsync( () => {
        console.log('Speech recognition started.');
        setIsListening(true);
        recognizer.recognized = (reco,e) => {
          try{
            const res = e.result;
            /*if (verification() > 0.5) {
              console.log(`recognized: ${res.text}`);
            }else{
              console.log('Speaker not recognized');
            }*/
          }catch(error){
            console.error('Error recognizing:', error);
          }
      }}
    )};
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
