import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useNavigate } from "react-router-dom";
import OrdonnancePreview from "../Components/Ordonnance/OrdonnancePreview";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TextField, Button, Grid, Typography,IconButton, Container, Card, CardContent, CardActions, List, ListItem, ListItemText, Divider, Box} from "@mui/material";

const currentUrl = window.location.href;
const parts = currentUrl.split('/');
const id_patient = parts[parts.length - 1];

function Ordonnance2() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  let [prescriptions, setPrescriptions] = useState([]);
  const [idPrescription, setIdPrescription] = useState([]);
  const [medicament, setMedicament] = useState("");
  const [posologie, setPosologie] = useState("");
  const [remarque, setRemarque] = useState("");
  const [generalComments, setGeneralComments] = useState("");

  // À remplaçer par des requetes fetch pour récupérer les données du patient, du docteur et du cabinet

  const patient = {
    id: '123',
    nom: 'Doe',
    prenom: 'John',
    age: 30,
    weight: 70,
    sexe: 'Masculin',
  };

  const docteur = {
    prenom: 'Jane',
    nom: 'Smith',
    specialite: 'Cardiologue',
    credentials: 'Diplomé de la Faculté de Médecine de Paris',
  };

  const cabinet = {
    adresse: '12 rue de la Paix',
    codePostal: '75001',
    ville: 'Paris',
    telephone: '01 23 45 67 89',
    telephoneUrg: '06 12 34 56 78',
  };

  useEffect(() => {
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
        console.log("AddPresc",data);
        setPrescriptions([...prescriptions, data]);
        setIdPrescription([...idPrescription, data._id]);
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
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions.splice(index, 1);
    setPrescriptions(updatedPrescriptions);
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
          prescriptions: idPrescription,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Ordonnance créée avec succès");
        console.log("AddOrdo",data);
        navigate(`/dossierPatient/${id_patient}`);
      } else {
        console.error("Failed to create ordonnance");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadPDF = () => {
    const capture = document.querySelector('.preview');
    setLoader(true);
    html2canvas(capture).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      setLoader(false);
      pdf.save('ordonnance.pdf');
    });
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h1" gutterBottom align="center">{patient.prenom} {patient.nom}</Typography>
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
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    AJOUTER
                  </Button>
                  <IconButton
                    onClick={toggleListening}
                    color={isListening ? "primary" : "default"}
                    sx={{ mt: 2, ml: 2 }}
                  >
                    {isListening ? <MicIcon /> : <MicOffIcon />}
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
              <TextField
                fullWidth
                label="General Comments"
                variant="outlined"
                multiline
                rows={3}
                value={generalComments}
                onChange={(e) => setGeneralComments(e.target.value)}
              />
              </Grid>
            </Grid>
          </form>
          <Button variant="contained" onClick={handleCreateOrdo} sx={{ mt: 2, display: 'block', mx: 'auto' }}> Créer Ordo </Button>
          {prescriptions.length > 0 && (
            <Card sx={{ mt: 2, overflow: "auto", maxHeight: 300 }}>
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
                              <br />
                              {prescription.Remarque && (
                                <Box component="span" variant="body2" sx={{ mt: 1 }}>
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
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h1" gutterBottom align="center">Aperçu Ordonnance</Typography>
          <OrdonnancePreview patient={patient} docteur={docteur} cabinet={cabinet} medicaments={prescriptions} comment={generalComments}/>
          <Button variant="contained" onClick={downloadPDF} sx={{ mt: 2, display: 'block', mx: 'auto' }}> Télécharger l'ordonnance </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Ordonnance2;