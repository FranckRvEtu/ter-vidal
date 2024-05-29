import "../Style/Ordonnance.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useNavigate, useParams } from "react-router-dom";
import OrdonnancePreview from "../Components/Ordonnance/OrdonnancePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

function Ordonnance() {
  const { patientId } = useParams();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  let [prescriptions, setPrescriptions] = useState([]);
  const [medicament, setMedicament] = useState("");
  const [posologie, setPosologie] = useState("");
  const [remarque, setRemarque] = useState("");
  const [generalComments, setGeneralComments] = useState("");
  const [patient, setPatient] = useState({});

  // À remplaçer par des requetes fetch pour récupérer les données du patient, du docteur et du cabinet

  const docteur = {
    prenom: "Jane",
    nom: "Smith",
    specialite: "Cardiologue",
    credentials: "Diplomé de la Faculté de Médecine de Paris",
  };

  const cabinet = {
    adresse: "12 rue de la Paix",
    codePostal: "75001",
    ville: "Paris",
    telephone: "01 23 45 67 89",
    telephoneUrg: "06 12 34 56 78",
  };

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await axiosPrivate.get(
          `http://localhost:11000/getPatient/${patientId}`
        );
        if (response.status === 200) {
          const data = response.data;
          setPatient(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getPatientData();

    if (window.annyang) {
      window.annyang.setLanguage("fr-FR");
      // Liste des commandes vocales
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
        setPatient({});
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
      const newPrescription = {
        Medicament: medicament,
        Posologie: posologie,
        Remarque: remarque,
      };
      console.log("AddPresc", newPrescription);
      setPrescriptions([...prescriptions, newPrescription]);
      setMedicament("");
      setPosologie("");
      setRemarque("");
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
      const responsePre = await axiosPrivate.post(
        "http://localhost:3013/addManyPrescriptions",
        JSON.stringify({
          prescriptions,
        })
      );
      if (responsePre.data === 200) {
        const data = responsePre.data;
        console.log("Prescriptions ajoutées avec succès");
        console.log("AddPresc", data);

        const response = await axiosPrivate.post(
          "http://localhost:3000/addOrdonnance",
          JSON.stringify({
            date: new Date(),
            idPatient: patientId,
            prescriptions: data,
          })
        );
        if (response.status === 200) {
          const dataOrdo = response.data;
          console.log("Ordonnance créée avec succès");
          console.log("AddOrdo", dataOrdo);
          if (window.confirm("Voulez-vous télécharger l'ordonnance ?")) {
            downloadPDF();
          }
          navigate(`/dossierPatient/${patientId}`);
        } else {
          console.error("Failed to create ordonnance");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadPDF = () => {
    const capture = document.querySelector(".preview");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      setLoader(false);
      pdf.save("ordonnance.pdf");
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit} id="ordonnance-form">
            <Grid container spacing={1}>
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
                  rows={2}
                  value={remarque}
                  onChange={(e) => setRemarque(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button variant="contained" type="submit" sx={{ mt: 0 }}>
                    AJOUTER
                  </Button>
                  <IconButton
                    onClick={toggleListening}
                    color={isListening ? "primary" : "default"}
                    sx={{ mt: 0, ml: 2 }}
                  >
                    {isListening ? (
                      <MicIcon color="primaryDark2  " />
                    ) : (
                      <MicOffIcon color="primary" />
                    )}
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="General Comments"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={generalComments}
                  onChange={(e) => setGeneralComments(e.target.value)}
                />
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            onClick={handleCreateOrdo}
            sx={{ mt: 2, display: "block", mx: "auto" }}
          >
            {" "}
            Créer Ordonnance{" "}
          </Button>
          {prescriptions.length > 0 && (
            <Card sx={{ mt: 2, overflow: "auto", maxHeight: "15vw" }}>
              <CardContent>
                <Typography variant="h6" sx={{ position: "absolute" }}>
                  Prescriptions ajoutées
                </Typography>
                <List sx={{ mt: 6, overflow: "auto", maxHeight: "8vw" }}>
                  {prescriptions.map((prescription, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          style={{
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          }}
                          primary={`Médicament: ${prescription.Medicament}`}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                                style={{
                                  whiteSpace: "normal",
                                  wordBreak: "break-word",
                                }}
                              >
                                Posologie: {prescription.Posologie}
                              </Typography>
                              <br />
                              {prescription.Remarque && (
                                <Box
                                  component="span"
                                  variant="body2"
                                  sx={{
                                    mt: 1,
                                    whiteSpace: "normal",
                                    wordBreak: "break-word",
                                  }}
                                >
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
          <OrdonnancePreview
            patient={patient}
            docteur={docteur}
            cabinet={cabinet}
            medicaments={prescriptions}
            comment={generalComments}
          />
          <Button
            variant="contained"
            onClick={downloadPDF}
            sx={{ mt: 0, display: "block", mx: "auto" }}
          >
            {" "}
            Télécharger l'ordonnance{" "}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Ordonnance;
