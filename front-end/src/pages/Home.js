import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stat from "../Components/Stat";

const HomePage = ({ appointments }) => {
  const navigate = useNavigate();

  // Create an array of 3 items, filling with empty objects if there are fewer than 3 appointments
  const displayAppointments = [
    ...appointments,
    ...Array(3 - appointments.length).fill({}),
  ].slice(0, 3);

  return (
    <Box>
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
          {displayAppointments.map((appointment, index) => (
            <Grid item key={index}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {appointment.lieu ? (
                    <>
                      <Typography variant="h5" component="div">
                        Lieu: {appointment.lieu}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {format(new Date(appointment.date), "PPp", {
                          locale: fr,
                        })}{" "}
                        <IconButton
                          color="voir"
                          onClick={() =>
                            navigate(`/dossierPatient/${appointment.idPatient}`)
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" component="div">
                        Aucun rendez-vous
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Aucune information disponible
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          position: "relative",
          left: "80%",
          mt: 1,
          transform: "translateX(-33.33%) scale(0.8)",
          width: "auto",
        }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          className="card-category"
        >
          Medication Usage
        </Typography>
        <Stat />
      </Box>
    </Box>
  );
};

export default HomePage;
