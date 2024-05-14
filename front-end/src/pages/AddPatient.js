import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    sexe: "",
    birthdate: "",
    BloodType: "",
    height: "",
    weight: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      birthdate: newValue ? newValue.toISOString().substring(0, 10) : "",
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFormData((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form");
    console.log(formData);
    fetch("http://localhost:11000/addPatient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient: formData }),
    })
      .then((response) => {
        if (response.ok) {
          // Assurez-vous que la réponse indique que l'opération a réussi
          return response.json(); // Process the response data
        }
        throw new Error("Network response was not ok."); // Throw error if response not ok
      })
      .then((data) => {
        console.log("Success:", data);
        navigate("/listePatient"); // Change this path to where you want to redirect
      })
      .catch((error) => {
        console.error("Error client:", error);
      });
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        scale: 0.9,
        mt: 0,
        position: "fixed",
        flexDirection: "column",
        alignItems: "center",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0.9)",
        overflow: "auto",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 0, alignSelf: "center" }}
      >
        <Avatar
          src={formData.image || "/path/to/default-avatar.jpg"}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date de naissance"
            name="birthdate"
            id="birthdate"
            views={["year", "month", "day"]}
            value={formData.birthdate ? dayjs(formData.birthdate) : null}
            onAccept={handleDateChange}
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
          color="primary"
          onChange={handleChange}
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
          onChange={handleChange}
        />

        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="sexe"
          label="Sexe"
          type="sexe"
          id="sexe"
          autoComplete="Sexe"
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="BloodType"
          label="BloodType"
          type="BloodType"
          id="BloodType"
          autoComplete="BloodType"
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Kg</InputAdornment>
            ),
          }}
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Picture
          </Button>
        </label>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Enregistrer Patient
        </Button>
      </Box>
    </Container>
  );
}
