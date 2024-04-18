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
const currentUrl = window.location.href;
const parts = currentUrl.split('/');
const id_patient = parts[parts.length - 1];
function Ordonnance2() {
  const [isListening, setIsListening] = useState(false);
  let [prescriptions, setPrescriptions] = useState([]);
  const [medicament, setMedicament] = useState("");
  const [posologie, setPosologie] = useState("");
  const [remarque, setRemarque] = useState("");
  useEffect(() => {
    /*
    const socket = io("http://192.168.1.32:5000");

    socket.on("transcribedText", (text) => {
      console.log(text);

      if (/(médicament|médicaments|Médicament|Médicaments)/gi.test(text)) {
        const modifiedString = text.replace(
          /(médicament|médicaments|Médicament|Médicaments)/gi,
          ""
        );
        console.log("medoc:" + modifiedString);

        setMedicament(
          (prevMedicament) => `${prevMedicament} ${modifiedString}`
        );
      }
    });
    */
    if (window.annyang) {
      window.annyang.setLanguage("fr-FR");

      const commands = {
        "médicament *text": (text) => {
          setMedicament((currentValue) => `${currentValue} ${text}`);
        },
        "posologie *text": (text) => {
          setPosologie((currentValue) => `${currentValue} ${text}`);
        },
        "commentaire *text": (text) => {
          setRemarque((currentValue) => `${currentValue} ${text}`);
        },
      };

      window.annyang.addCommands(commands);

      return () => {
        if (window.annyang) window.annyang.abort();
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      window.annyang.abort();
    } else {
      window.annyang.start();
    }
    setIsListening(!isListening);
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

  const handleDeletePrescription = (index) => {
    console.log(prescriptions);

    const updatedPrescriptions = [...prescriptions];

    updatedPrescriptions.splice(index, 1);
    console.log(updatedPrescriptions);

    prescriptions = updatedPrescriptions;
    setPrescriptions(prescriptions);

    console.log(prescriptions);
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
          idPatient: id_patient,
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
                        onClick={() => handleDeletePrescription(index)}
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
