import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { format } from "date-fns"; // Make sure this dependency is installed
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomCard from "../Components/card"; // Adjust this import path to match your project

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
            {/* Using your custom Card component */}
            <CustomCard
              primary={`Lieu: ${appointment.lieu}`}
              secondary={format(new Date(appointment.date), "PPpp")}
              iconPerformance={() => <VisibilityIcon />}
              percentage={100} // or another relevant value
              color="#0078d7" // Example color, adjust based on your custom card
              onClick={() =>
                navigate(`/dossierPatient/${appointment.idPatient}`)
              } // Navigate to the patient file
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
