import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import iconPeople from "../../public/Assets/anonyme.jpg";
import { auto } from "@popperjs/core";

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
          backgroundColor: "transparent", // Rendre le Paper transparent
          boxShadow: "none", // Supprimer l'ombre pour moins de visibilité
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
            justifyContent: "space-between",
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
                  maxWidth: 400, // Augmentez légèrement la largeur maximale pour rendre les cartes plus larges
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
                  image={iconPeople}
                  alt="recipe thumbnail"
                />

                <Divider />
                <CardContent>
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
                  <Grid
                    container
                    spacing={1}
                    sx={{ mt: 2, justifyContent: "center" }}
                  >
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/dossierPatient/${patient._id}`)
                        }
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        color="warning"
                        onClick={() => navigate(`/editPatient/${patient._id}`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="error">
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
