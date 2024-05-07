import * as React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealingIcon from "@mui/icons-material/Healing";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  Button,
  Hidden,
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
          sx={{ p: 2, ml: 5, mt: 2.5, mb: 1 }}
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
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
            position: "relative",
            border: "1px solid #000",
            padding: 0,
            transform: "scale(1.05)",
            mt: 2,
            ml: 5,
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
              pt: 1,
              pb: 0,
              pr: 1,
              pl: 1,
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
            <Paper
              sx={{
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                position: "relative",
                border: "1px solid #000",
                padding: 2,
                width: "90%",
                margin: 2,

                height: "40vh", // Ensure it has the same height as the other sections
              }}
            >
              <Grid container>
                {/* Icon positioned partially outside of the card's main content */}
                <Hidden only="sm">
                  <Box
                    sx={{
                      height: "5vw",
                      width: "5vw",
                      display: "flex",
                      position: "absolute",
                      zIndex: 1,
                      top: -20,
                      left: 12,
                      background: "linear-gradient(to top, #BDDAD0, #FFFFFF)", // Salmon pink to white gradient
                      borderRadius: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #000",
                    }}
                  >
                    <AssignmentIcon />
                  </Box>
                </Hidden>

                {/* Header information */}
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ padding: 0, margin: "16px 0" }}
                >
                  <Typography variant="h6" align="left">
                    Ordonnances
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ color: "#000" }} />

              {/* List of prescriptions */}
              <List
                sx={{
                  overflow: "auto",
                  height: "27vh", // Set the height of the list
                }}
              >
                {ordonnances &&
                  ordonnances.map((ordonnance) => (
                    <ListItem
                      key={ordonnance._id}
                      sx={{ marginBottom: 1 }}
                      button
                      onClick={() => handleOrdonnanceClick(ordonnance._id)}
                    >
                      <ListItemText
                        primary={` ${format(
                          new Date(ordonnance.date),
                          "dd/MM/yyyy"
                        )}`}
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
          {/* Rendez-vous */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                position: "relative",
                border: "1px solid #000",
                padding: 2,
                width: "90%",
                margin: 2,
                height: "40vh", // Set the height of the entire section
              }}
            >
              <Grid container>
                {/* Icon positioned outside of the card's main content */}
                <Hidden only="sm">
                  <Grid
                    sx={{
                      height: "5vw",
                      width: "5vw",
                      display: "flex",
                      position: "absolute",
                      zIndex: 1,
                      top: -20,
                      left: 12,
                      background: "linear-gradient(to top, #C7E6F4, #FFFFFF)", // Salmon pink to white gradient
                      color: "",
                      borderRadius: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #000",
                    }}
                  >
                    <CalendarTodayIcon />
                  </Grid>
                </Hidden>

                {/* Header information */}
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ padding: 0, margin: "16px 0" }}
                >
                  <Typography variant="h6" align="left">
                    Rendez vous
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ color: "#000" }} />

              {/* List of appointments */}
              <List
                sx={{
                  overflow: "auto",
                  height: "27vh", // Set the height of the list
                }}
              >
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
            <Paper
              sx={{
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                position: "relative",
                border: "1px solid #000",
                padding: 2,
                width: "90%",
                margin: 2,
                height: "40vh", // Set the height of the entire section to match Rendez-vous
              }}
            >
              <Grid container>
                {/* Icon positioned partially outside of the card's main content */}
                <Hidden only="sm">
                  <Box
                    sx={{
                      height: "5vw",
                      width: "5vw",
                      display: "flex",
                      position: "absolute",
                      zIndex: 1,
                      top: -20,
                      left: 12,
                      background: "linear-gradient(to top, #E7C9D5, #FFFFFF)", // Salmon pink to white gradient
                      borderRadius: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #000",
                    }}
                  >
                    <HealingIcon />
                  </Box>
                </Hidden>

                {/* Header information */}
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ padding: 0, margin: "16px 0" }}
                >
                  <Typography variant="h6" align="left">
                    Antécédants
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ color: "#000" }} />

              {/* List of antecedents */}
              <List
                sx={{
                  overflow: "auto",
                  height: "27vh", // Set the height of the list
                }}
              >
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
            <Paper
              sx={{
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                position: "relative",
                border: "1px solid #000",
                padding: 2,
                width: "90%",
                margin: 2,
                mt: 2,
                height: "40vh", // Set the height of the entire section
              }}
            >
              <Grid container>
                {/* Icon positioned partially outside of the card's main content */}
                <Hidden only="sm">
                  <Grid
                    sx={{
                      height: "5vw",
                      width: "5vw",
                      display: "flex",
                      position: "absolute",
                      zIndex: 1,
                      top: -20,
                      left: 12,
                      background: "linear-gradient(to top, #D7C9DD, #FFFFFF)", // Salmon pink to white gradient
                      color: "",
                      borderRadius: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #000",
                    }}
                  >
                    <MedicalServicesIcon />
                  </Grid>
                </Hidden>

                {/* Fixed Header information */}
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{
                    padding: 0,
                    margin: "16px 0",
                    position: "sticky", // Fixes the position
                    top: 0,
                    zIndex: 2,
                    backgroundColor: "",
                  }}
                >
                  <Typography variant="h6" align="left">
                    Visites
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ color: "#000" }} />

              {/* Scrollable List of visits */}
              <List
                sx={{
                  overflow: "auto",
                  height: "27vh", // Set the height of the list
                }}
              >
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
