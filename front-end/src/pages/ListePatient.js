import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Card,
  Avatar,
  CardContent,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import iconPeople from "../../public/Assets/anonyme.jpg";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function ListePatient({ patientsInitiaux = [] }) {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");
  const [patientsAffiches, setPatientsAffiches] = useState(patientsInitiaux);
  const axiosPrivate = useAxiosPrivate();

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
    axiosPrivate
      .get(`http://localhost:11000/deletePatient/${id}`)
      .then((response) => {
        if (response.status === 200) {
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
        await axiosPrivate
          .get(`http://localhost:5000/deleteRDVFromPatient/${idPatient}`)
          .then((response) => {
            if (response.status === 200) {
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
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "auto",
              }}
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  width: "100%",
                  height: "auto",
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
                    minHeight: "20vw",
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
