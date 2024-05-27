import * as React from "react";
import {
  ThemeProvider,
  Container,
  Box,
  TextField,
  Button,
  Input,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function AddPatient() {
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const patient = {
      firstname: data.get("firstname"),
      name: data.get("name"),
      sexe: data.get("sex"),
      birthdate: data.get("birthdate"),
      BloodType: data.get("bloodtype"),
      height: data.get("height"),
      weight: data.get("weight"),
      antecedant: [],
      listIDOrdo: [],
      listIDrdv: [],
      listIDvisite: [],
    };
    

    console.log(patient);
    axiosPrivate.post("http://localhost:11000/addPatient",
      JSON.stringify({ patient }),
    )
      .then((response) => {
        if (response.ok) {
          console.log("Patient bien ajouté", patient);
        } else {
          console.error("Erreur lors de l'envoi du patient");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du patient", error);
      });
  };
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 20 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date de naissance"
            name="birthdate"
            id="birthdate"
            views={["year", "month", "day"]}
          />
        </LocalizationProvider>

        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="Firstname"
          name="firstname"
          autoComplete="firstname"
          autoFocus
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="name"
          label="Name"
          type="name"
          id="name"
          autoComplete="name"
        />

        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="sex"
          label="Sex"
          type="sex"
          id="sex"
          autoComplete="Sexe"
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="bloodtype"
          label="Bloodtype"
          type="bloodtype"
          id="bloodtype"
          autoComplete="bloodtype"
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="height"
          label="Height"
          type="height"
          id="height"
          autoComplete="height"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Cm</InputAdornment>
            ),
          }}
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="weight"
          label="Weight"
          type="weight"
          id="weight"
          autoComplete="weight"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Kg</InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Enregistrer Patient
        </Button>
      </Box>
    </Container>
  );
}
