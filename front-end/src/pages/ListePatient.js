import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import iconPeople from "../../public/Assets/anonyme.jpg";

export default function ListePatient({ patientsInitiaux = [] }) {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");

  const [patientsAffiches, setPatientsAffiches] = useState(patientsInitiaux);

  useEffect(() => {
    let resultats = [...patientsInitiaux];

    // Filtrage
    if (recherche) {
      resultats = resultats.filter(
        (patient) =>
          patient.name?.toLowerCase().includes(recherche.toLowerCase()) ||
          patient.firstname?.toLowerCase().includes(recherche.toLowerCase())
      );
    }

    // Tri

    setPatientsAffiches(resultats);
  }, [recherche, patientsInitiaux]);

  const handleSearch = () => {
    console.log("Recherche en cours pour:", recherche);
  };

  const handleDelete = async (id) => {
    fetch(`http://localhost:11000/deletePatient/${id}`, {
      method: "GET",
    }).then((response) => {
      if (response.ok) {
        window.alert("Patient supprimé avec succès");
        window.location.reload();
      } else {
        console.error("Erreur lors de la suppression du patient");
      }
    });
  };
  const deleteRDVs = async (idPatient) => {
    if (
      window.confirm(
        "Voulez-vous vraiment supprimer ce patient ? Tous les rendez-vous associés seront également supprimés."
      )
    ) {
      try {
        await fetch(`http://localhost:5000/deleteRDVFromPatient/${idPatient}`, {
          method: "GET",
        }).then((response) => {
          if (response.ok) {
            console.log("RDVs supprimés avec succès");
            console.log("response", response.ok);
            handleDelete(idPatient);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{}}>
      <Grid alignItems="center" sx={{}}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Rechercher un patient"
            variant="standard"
            value={recherche}
            color="primary"
            onChange={(e) => setRecherche(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Paper
        sx={{
          overflow: "auto",
          mt: 4,
          maxHeight: 700,
          padding: 2,
          backgroundColor: "transparent",
          boxShadow: "none",
          "&::-webkit-scrollbar": { display: "none" }, // Pour les navigateurs Webkit (Chrome, Safari, etc.)
          scrollbarWidth: "none", // Pour Firefox
          "-ms-overflow-style": "none", // Pour Internet Explorer 10+
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            mt: 0,
          }}
        >
          {patientsAffiches.map((patient, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={patient._id || index}
              sx={{
                mt: 0,
                justifyContent: "space-between",
              }}
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  maxWidth: 400,
                  transition: "transform 0.2s ease-in-out",
                  ":hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "contain",
                  }}
                  image={patient.image || iconPeople}
                  alt="recipe thumbnail"
                />

                <Divider />
                <CardContent
                  sx={{
                    background: (theme) =>
                      `linear-gradient(45deg, ${theme.palette.primaryLight2.main} 30%, ${theme.palette.primaryDark2.main} 90%)`,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: "bold" }}
                  >
                    {`${patient.firstname} ${patient.name}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(patient.birthdate).toLocaleDateString()}
                  </Typography>
                  <Grid container sx={{ justifyContent: "center" }}>
                    <Grid item sx={{ mx: 2 }}>
                      {" "}
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/dossierPatient/${patient._id}`)
                        }
                      >
                        <DriveFileMoveIcon />
                      </IconButton>
                    </Grid>
                    <Grid item sx={{ mx: 2 }}>
                      {" "}
                      <IconButton
                        color="warning"
                        onClick={() => navigate(`/editPatient/${patient._id}`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    <Grid item sx={{ mx: 2 }}>
                      {" "}
                      <IconButton
                        color="error"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Voulez-vous vraiment supprimer ce patient ?"
                            )
                          ) {
                            fetch(
                              `http://localhost:11000/deletePatient/${patient._id}`,
                              {
                                method: "GET",
                              }
                            ).then((response) => {
                              console.log(response.ok);
                              if (response.ok) {
                                window.alert("Patient supprimé avec succès");
                                window.location.reload();
                              } else {
                                console.error(
                                  "Erreur lors de la suppression du patient"
                                );
                              }
                            });
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate("/addPatient")}
      >
        Ajouter un Patient
      </Button>
    </Container>
  );
}
