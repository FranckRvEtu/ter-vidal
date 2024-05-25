import React, { useState} from "react";
import { useParams } from "react-router-dom";

import { Container, Grid, TextField, Button, List, ListItem, ListItemText, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


function Antecedant() {
    const { patientId } = useParams();

  const [antecedant, setAntecedant] = useState("");
  const [antecedants, setAntecedants] = useState([]);

  const handleAddAntecedant = () => {
    if (antecedant.trim() !== "") {
      setAntecedants([...antecedants, antecedant.trim()]);
      setAntecedant(""); // Clears the field after adding
    }
  };

  const handleDeleteAntecedant = (index) => {
    const updatedAntecedants = [...antecedants];
    updatedAntecedants.splice(index, 1);
    setAntecedants(updatedAntecedants);
  };

  const handleAddAntecedantsToPatient = async () => {
    try {
       // Obtenir l'ID du patient à partir des paramètres de l'URL

  
      for (let i = 0; i < antecedants.length; i++) {
        const response = await fetch(`http://localhost:11000/addAntecedant/`, { // Ajoutez l'ID du patient à l'URL de la requête
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            diagnostic: antecedants[i], // Ici, j'ai utilisé le diagnostic comme nom de champ, vous pouvez ajuster si nécessaire
            date: new Date().toISOString(), // Utilise la date actuelle comme exemple, à remplacer par la date réelle si nécessaire
            description: "",
            patientId:patientId // Vous pouvez ajouter la description ici si nécessaire
          })
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Antécédant ajouté avec succès avec l'ID :", data.id);
        } else {
          console.error("Échec de l'ajout de l'antécédant");
        }
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Intitulé de l'antécédant"
            variant="outlined"
            value={antecedant}
            onChange={(e) => setAntecedant(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAddAntecedant} sx={{ mb: 2 }}>
            Ajouter l'antécédant
          </Button>
          <Button variant="contained" onClick={handleAddAntecedantsToPatient} sx={{ mb: 2 }}>
            Ajouter les antécédants au patient
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Liste des Antécédants
          </Typography>
          <List dense>
            {antecedants.map((antecedant, index) => (
              <ListItem key={index}>
                <ListItemText primary={antecedant} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAntecedant(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Antecedant;
