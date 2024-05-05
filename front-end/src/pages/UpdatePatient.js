import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const UpdatePatient = ({ patient }) => {
  const [formData, setFormData] = useState({
    name: patient.name,
    firstname: patient.firstname,
    sexe: patient.sexe,
    height: patient.height,
    weight: patient.weight,
    birthdate: format(new Date(patient.birthdate), "yyyy-MM-dd"),
    BloodType: patient.BloodType,
    image: patient.image || "", // Ensure there is a default empty string
  });
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
  const clearImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const allFieldsFilled = Object.entries(formData).every(([key, value]) => {
    return (key === "image" && value === "") || value !== "";
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    console.log("Submitting form");
    e.preventDefault();
    if (allFieldsFilled) {
      fetch(`http://localhost:11000/updatePatient/${patient._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => navigate("/ListePatient")) // Redirect after update
        .catch((error) => console.error("Error pas de post:", error));
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        mx: "auto",
        width: "100%",
        maxWidth: 960,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // This centers the children components
      }}
    >
      <Typography variant="h6" sx={{ maxWidth: "100%", mt: 1 }}>
        Informations du Patient
      </Typography>
      <Avatar
        sx={{ width: 100, height: 100, mb: 2 }}
        src={formData.image || "/path/to/default-avatar.jpg"}
      />
      <input
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="image-file"
      />
      <label htmlFor="image-file">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      <div>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          component="span"
          onClick={clearImage}
        >
          Clear
        </Button>
      </div>
      <Box sx={{ textAlign: "left", maxWidth: "100%", mt: 1 }}>
        <TextField
          fullWidth
          label="Nom"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="standard"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Prénom"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          variant="standard"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Sexe"
          name="sexe"
          value={formData.sexe}
          onChange={handleChange}
          variant="standard"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Taille (cm)"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
          variant="standard"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Poids (kg)"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          variant="standard"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Date de Naissance"
          name="birthdate"
          type="date"
          value={formData.birthdate}
          onChange={handleChange}
          variant="standard"
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          fullWidth
          label="Groupe Sanguin"
          name="BloodType"
          value={formData.BloodType}
          onChange={handleChange}
          variant="standard"
          margin="dense"
          required
        />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!allFieldsFilled} // Button is disabled if not all fields are filled
      >
        mis à jour
      </Button>
    </Box>
  );
};

export default UpdatePatient;
