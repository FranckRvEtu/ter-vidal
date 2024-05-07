import * as React from "react";
import {
  Button,
  Box,
  Avatar,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { ListItemIcon } from "@mui/material";

export default function DossierPatient({
  patient,
  ordonnances = [],
  rdvs = [],
  antecedants = [],
  visites = [],
}) {
  const navigate = useNavigate();
  const handleOrdonnanceClick = (id) => {
    console.log(
      `Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`
    );
  };

  const handleVisiteClick = (id) => {
    console.log(
      `Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`
    );
  };
  const handleRDVClick = (id) => {
    console.log(
      `Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`
    );
  };

  const handleAntecedantClick = (id) => {
    console.log(
      `Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`
    );
  };
  const commonPaperStyles = {
    borderRadius: 5,

    ml: 2,
    mb: 2,
    mr: 2,
    mt: 0,
    padding: 2,
    minHeight: "18vw",
    maxWidth: "40vw",
    maxHeight: "18vw",
    overflow: "auto",
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ p: 2, ml: 5, mt: 2.5, mb: 1, color: "white" }}
          onClick={() => navigate(`/ordonnance/${patient._id}`)}
        >
          Démarrer une consultation
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ p: 2, ml: 5, mt: 1, mb: 1 }}
          onClick={() => navigate(`/editPatient/${patient._id}`)}
        >
          Modifier le patient
        </Button>
        <Paper
          elevation={3}
          color="primaryDark2"
          sx={{
            borderRadius: 5,
            p: 1,
            ml: 5,
            mt: 3.5,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "black",
            width: "20vw",
            height: "33.5vw",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              width: "100%",
            }}
          >
            Informations du Patient
          </Typography>
          <Avatar
            sx={{ width: 56, height: 56, mb: 0, mt: 2, alignSelf: "center" }}
            src={patient.image} // Using Base64 image string directly
          />
          <Typography alignSelf="center">
            {patient.name} {patient.firstname}
          </Typography>
          <Grid
            container
            spacing={2} // Ajoute un espace entre les Paper
            sx={{
              textAlign: "center",
              maxWidth: "90%",
              mt: 1,
              alignItems: "center",
            }}
          >
            {[
              { label: "Sexe", value: patient.sexe },
              { label: "Taille", value: `${patient.height} cm` },
              { label: "Poids", value: `${patient.weight} kg` },
              {
                label: "Date de naissance",
                value: format(new Date(patient.birthdate), "dd/MM/yyyy"),
              },
              { label: "Groupe sanguin", value: patient.BloodType },
            ].map((item, index) => (
              <Grid item xs={6} key={index}>
                <Paper
                  elevation={3} // Contrôle l'intensité de l'ombre du Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px", // Ajustez cette valeur à votre convenance
                    p: 2, // Ajoute un padding pour un meilleur espacement
                  }}
                >
                  <Typography variant="h20">{item.label}</Typography>
                  <Typography>{item.value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          mt: 2,
          color: "white",
        }}
      >
        {/* Ligne 1 : Ordonnances et Rendez-vous */}
        <Grid container spacing={2} alignItems="" sx={{ mt: 4 }}>
          {/* Ordonnances */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" sx={{ ml: 2 }}>
              Ordonnances
            </Typography>
            <Paper sx={commonPaperStyles}>
              <List sx={{ color: "" }}>
                {ordonnances &&
                  ordonnances.map((ordonnance) => (
                    <div key={ordonnance._id}>
                      <ListItem
                        sx={{ marginBottom: 1 }}
                        button
                        onClick={() => handleOrdonnanceClick(ordonnance._id)}
                      >
                        <ListItemIcon>
                          <img
                            src="/Assets/prescription.png"
                            alt="Icon"
                            color="primary"
                            style={{ width: 24, height: 24 }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={` ${format(
                            new Date(ordonnance.date),
                            "dd/MM/yyyy"
                          )}`}
                        />
                      </ListItem>
                    </div>
                  ))}
              </List>
            </Paper>
          </Grid>

          {/* Rendez-vous */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" sx={{ ml: 2 }}>
              Rendez-vous
            </Typography>
            <Paper sx={commonPaperStyles}>
              <List>
                {rdvs &&
                  rdvs.map((rdv) => (
                    <ListItem
                      key={rdv._id}
                      sx={{ marginBottom: 1 }}
                      button
                      onClick={() => handleRDVClick(rdv._id)}
                    >
                      <ListItemText
                        primary={`Rendez-vous le ${format(
                          new Date(rdv.date),
                          "dd/MM/yyyy à HH:mm"
                        )}`}
                        secondary={`Lieu : ${rdv.lieu}`}
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Ligne 2 : Antécédants et Visites */}
        <Grid container spacing={2} alignItems="flex-start">
          {/* Antécédants */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" sx={{ ml: 2 }}>
              Antécédants
            </Typography>
            <Paper sx={commonPaperStyles}>
              <List>
                {antecedants &&
                  antecedants.map((antecedant) => (
                    <ListItem
                      key={antecedant._id}
                      sx={{ marginBottom: 1 }}
                      button
                      onClick={() => handleAntecedantClick(antecedant._id)}
                    >
                      <ListItemText
                        primary={`Antécédant : ${antecedant.diagnostic}`}
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>

          {/* Visites */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" sx={{ ml: 2 }}>
              Visites
            </Typography>
            <Paper sx={commonPaperStyles}>
              <List>
                {visites &&
                  visites.map((visite) => (
                    <ListItem
                      key={visite._id}
                      sx={{ marginBottom: 1 }}
                      button
                      onClick={() => handleVisiteClick(visite._id)}
                    >
                      <ListItemText
                        primary={`Visite le ${format(
                          new Date(visite.date),
                          "dd/MM/yyyy à HH:mm"
                        )}`}
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
