import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const HomePage = () => {
  // Replace this with actual data
  const appointments = [
    { id: "65fb5f289805b1d954a06b11", time: "10:00 AM", patient: "cengi test" },
    { id: 2, time: "11:00 AM", patient: "Jane Doe" },
    { id: 3, time: "12:00 PM", patient: "Jim Doe" },
  ];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" component="h1" align="center" sx={{ mt: 10 }}>
        Welcome to the Appointments Page
      </Typography>
      <Grid
        container
        spacing={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {appointments.map((appointment) => (
          <Grid item key={appointment.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {appointment.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {appointment.patient}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
