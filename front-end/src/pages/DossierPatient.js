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
          variant="contained"
          color="primary"
          sx={{ p: 2, ml: 5, mt: 2, mb: 2 }}
          onClick={() => navigate(`/ordonnance/${patient._id}`)}
        >
          Accéder à Ordonnance
        </Button>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            ml: 5,
            mt: 2,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              textDecoration: "underline",
              width: "100%",
            }}
          >
            Informations du Patient
          </Typography>
          <Avatar
            sx={{ width: 56, height: 56, mb: 5, mt: 5 }}
            src={patient.image} // Using Base64 image string directly
          />
          <Box sx={{ textAlign: "left", maxWidth: "80%", mt: 1 }}>
            <Typography sx={{ mt: 3 }}>Nom: {patient.name}</Typography>
            <Divider />
            <Typography sx={{ mt: 3 }}>Prénom: {patient.firstname}</Typography>
            <Divider />
            <Typography sx={{ mt: 3 }}>Sexe: {patient.sexe}</Typography>
            <Divider />
            <Typography sx={{ mt: 3 }}>Taille: {patient.height} cm</Typography>
            <Divider />
            <Typography sx={{ mt: 3 }}>Poids: {patient.weight} kg</Typography>
            <Divider />
            <Typography sx={{ mt: 3 }}>
              Date de naissance:{" "}
              {format(new Date(patient.birthdate), "dd/MM/yyyy")}
            </Typography>
            <Divider />
            <Typography sx={{ mt: 3 }}>
              Groupe sanguin: {patient.BloodType}
            </Typography>
            <Divider />
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1, mt: 2 }}
      >
        {/* Ligne 1 : Ordonnances et Rendez-vous */}
        <Grid container spacing={2} alignItems="flex-start">
          {/* Ordonnances */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2">
              Ordonnances
            </Typography>
            <Paper
              sx={{
                margin: 2,
                padding: 2,
                minHeight: 300,
                maxWidth: 700,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
              <List>
                {ordonnances &&
                  ordonnances.map((ordonnance) => (
                    <div key={ordonnance._id}>
                      <ListItem
                        button
                        onClick={() => handleOrdonnanceClick(ordonnance._id)}
                      >
                        <ListItemIcon>
                          <img
                            src="/Assets/prescription.png"
                            alt="Icon"
                            style={{ width: 24, height: 24 }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Date d'ordonnance : ${format(
                            new Date(ordonnance.date),
                            "dd/MM/yyyy"
                          )}`}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
              </List>
            </Paper>
          </Grid>

          {/* Rendez-vous */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2">
              Rendez-vous
            </Typography>
            <Paper
              sx={{
                margin: 2,
                padding: 2,
                minHeight: 300,
                maxWidth: 700,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
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
            <Typography variant="h6" component="h2">
              Antécédants
            </Typography>
            <Paper
              sx={{
                margin: 2,
                padding: 2,
                minHeight: 300,
                maxWidth: 700,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
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
            <Typography variant="h6" component="h2">
              Visites
            </Typography>
            <Paper
              sx={{
                margin: 2,
                padding: 2,
                minHeight: 300,
                maxWidth: 700,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
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
