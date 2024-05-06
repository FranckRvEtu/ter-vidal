import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Card,
  CardMedia,
  Avatar,
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
  const getInitials = (name, firstname) => {
    return `${firstname.charAt(0)}${name.charAt(0)}`;
  };
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
            sx={{
              width: "80%",
              Color: "white",
              borderRadius: "8px",
              ml: 4,
              mt: 1,
            }}
            label="Rechercher un patient"
            variant="outlined"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid
        sx={{
          overflow: "auto",
          mt: 1,
          mb: 1,
          maxHeight: "80vh",
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
                justifyContent: "center", // Centrer les éléments horizontalement
                alignItems: "center", // Centrer les éléments verticalement
                width: "100%", // Assurer que la grille occupe toute la largeur disponible
                height: "auto", // Ajuster automatiquement la hauteur en fonction de la largeur
              }}
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  width: "100%", // Remplir entièrement l'espace de la grille
                  height: "auto", // Remplir entièrement l'espace de la grille
                  transform: "scale(0.95)",
                  transition: "transform 0.2s ease-in-out",
                  ":hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "20vw", // 1/5 de la hauteur de l'écran
                    background: (theme) =>
                      `linear-gradient(90deg, ${theme.palette.primaryLight2.main} 0%, ${theme.palette.primaryDark2.main} 100%)`,
                  }}
                  onClick={() => navigate(`/dossierPatient/${patient._id}`)}
                >
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={iconPeople}
                  ></Avatar>
                  <Typography
                    gutterBottom
                    color="white"
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: "bold" }}
                  >
                    {`${patient.firstname} ${patient.name}`}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {format(new Date(patient.birthdate), "d MMMM yyyy", {
                      locale: fr,
                    })}
                  </Typography>
                  <Grid container sx={{ justifyContent: "center" }}>
                    <Grid item sx={{ mx: 2 }}>
                      {" "}
                      <IconButton
                        color="error"
                        onClick={() => deleteRDVs(patient._id)}
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
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ ml: 4 }}
        onClick={() => navigate("/addPatient")}
      >
        Ajouter un Patient
      </Button>
    </Container>
  );
}
