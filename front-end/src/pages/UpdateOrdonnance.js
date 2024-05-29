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

function UpdateOrdonnance() {
  const { ordonnanceId } = useParams();
  const patientId = "615f6b3b7f4b3b1b3c1b1b1b";
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  let [prescriptions, setPrescriptions] = useState([]);
  const [medicament, setMedicament] = useState("");
  const [posologie, setPosologie] = useState("");
  const [remarque, setRemarque] = useState("");
  const [generalComments, setGeneralComments] = useState("");
  const [patient, setPatient] = useState({});
  let [existingPrescriptions, setExistingPrescriptions] = useState([]);
  const [date, setDate] = useState(new Date());

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
    // const getPatientData = async () => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:11000/getPatient/${patientId}`,
    //       {
    //         method: "GET",
    //       }
    //     );
    //     if (response.ok) {
    //       const data = await response.json();
    //       setPatient(data);
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };

    // getPatientData();

    async function getOrdonnanceData() {
        try {
            const response = await fetch(`http://localhost:3000/getOrdonnance/${ordonnanceId}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Ordonnance Data:", data);
                setDate(data.date);

                if (data && data.Prescription) {
                    // Fetch all prescriptions
                    const prescriptionsPromises = data.Prescription.map(async (prescriptionId) => {
                        const response = await fetch(`http://localhost:3013/getPrescription/${prescriptionId}`);
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Failed to fetch prescription');
                        }
                    });

                    const prescriptions = await Promise.all(prescriptionsPromises);
                    setPrescriptions(prescriptions);
                    setExistingPrescriptions(prescriptions);
                    console.log("Prescriptions Data:", prescriptions);
                }

                if (data && data.idPatient) {
                    const response = await fetch(`http://localhost:11000/getPatient/${data.idPatient}`);
                    if (response.ok) {
                        const data = await response.json();
                        setPatient(data);
                        console.log("Patient Data:", data);
                    }
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    getOrdonnanceData();

    // if (window.annyang) {
    //   window.annyang.setLanguage("fr-FR");
    //   // Liste des commandes vocales
    //   const commands = {
    //     "médicament *text": (text) => {
    //       setMedicament((currentValue) => `${currentValue} ${text}`);
    //     },
    //     "posologie *text": (text) => {
    //       setPosologie((currentValue) => `${currentValue} ${text}`);
    //     },
    //     "commentaire *text": (text) => {
    //       setRemarque((currentValue) => `${currentValue} ${text}`);
    //     },
    //   };

    //   window.annyang.addCommands(commands);

    //   return () => {
    //     if (window.annyang) window.annyang.abort();
    //     setPatient({});
    //   };
    // }
  }, [ordonnanceId]);

  const toggleListening = () => {
    // if (isListening) {
    //   window.annyang.abort();
    // } else {
    //   window.annyang.start();
    // }
    // setIsListening(!isListening);
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

  const handleUpdateOrdonnace = async () => {
    try {
        let newPrescriptions = prescriptions.filter(
            (prescription) => !existingPrescriptions.some(
              (existingPrescription) => existingPrescription._id === prescription._id
            )
        );

        console.log("New Prescriptions", newPrescriptions);

        const responsePre = await fetch(
            "http://localhost:3013/addManyPrescriptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({newPrescriptions}),
            }
      );
      
      if (responsePre.ok) {
        const data = await responsePre.json();
        console.log("Nouvelles prescriptions ajoutées avec succès");
        console.log("AddPresc", data);
        console.log("Prescriptions", prescriptions);
        console.log("Date", date);
        console.log("Patient", patient);

        const response = await fetch(`http://localhost:3000/updateOrdonnance/${ordonnanceId}` , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: date,
            idPatient: patient._id,
            prescriptions: prescriptions,
          }),
        });
        if (response.ok) {
          const dataOrdo = await response.json();
          console.log("Ordonnance modifiée avec succès");
          console.log("UpdateOrdo", dataOrdo);
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
            onClick={handleUpdateOrdonnace}
            sx={{ mt: 2, display: "block", mx: "auto" }}
          >
            {" "}
            Mise à jour Ordonnance{" "}
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

export default UpdateOrdonnance;
