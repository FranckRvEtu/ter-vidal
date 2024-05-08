import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns"; // Assurez-vous d'installer cette dépendance
import { fr } from "date-fns/locale"; // Assurez-vous d'installer cette dépendance
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
const HomePage = ({ appointments }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Grid
        container
        spacing={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {appointments.map((appointment, index) => (
          <Grid item key={index}>
            {" "}
            {/* Utilisation de l'index comme clé si `appointment` n'a pas d'`id` unique */}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Lieu: {appointment.lieu}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {format(new Date(appointment.date), "PPp", { locate: fr })}{" "}
                  <IconButton
                    color="voir"
                    onClick={() =>
                      navigate(`/dossierPatient/${appointment.idPatient}`)
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Typography>
                {/* Si vous avez accès aux données du patient (nom, etc.), vous pouvez les ajouter ici */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
