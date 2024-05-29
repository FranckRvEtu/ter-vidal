import React, { useState } from "react";
import { TextField, Button, Box, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UpdatePatient = ({ patient }) => {
  const [formData, setFormData] = useState({
    name: patient.name,
    firstname: patient.firstname,
    sexe: patient.sexe,
    height: patient.height,
    weight: patient.weight,
    birthdate: format(new Date(patient.birthdate), "yyyy-MM-dd"),
    BloodType: patient.BloodType,
    image: patient.image || "", // si le patient n'a pas d'image, on initialise à une chaîne vide
  });
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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

  const handleSubmit = (e) => {
    console.log("Submitting form");
    e.preventDefault();
    if (allFieldsFilled) {
      axiosPrivate.post(`http://localhost:11000/updatePatient/${patient._id}`,
        JSON.stringify({formData})
      )
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
        mt: 0,
        mx: "auto",
        width: "100%",
        maxWidth: 960,
        px: 0,
        display: "flex",
        flexDirection: "column",
        position: "static",
        alignItems: "center",
        justifyContent: "center",
        transform: "scale(0.85)",
      }}
    >
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
        disabled={!allFieldsFilled} //on veut que le bouton soit désactivé si tous les champs ne sont pas remplis
      >
        mis à jour
      </Button>
    </Box>
  );
};

export default UpdatePatient;
