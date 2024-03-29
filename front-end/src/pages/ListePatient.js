import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, IconButton, Paper, TextField, Typography, InputAdornment, Menu, MenuItem, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Imaginons que vous ayez une liste initiale de patients (pour l'exemple)
const patientsInitiaux = [
  { id: 1, nom: "Doe", prenom: "John", imageUrl: "/path/to/image1.jpg" },
  { id: 2, nom: "Smith", prenom: "Anna", imageUrl: "/path/to/image2.jpg" },
  { id: 3, nom: "Jones", prenom: "James", imageUrl: "/path/to/image3.jpg" },
  // Ajoutez plus si nécessaire...
];

export default function ListePatient() {
  const [patients, setPatients] = useState(patientsInitiaux);
  const [recherche, setRecherche] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [triOptions, setTriOptions] = useState([
    { label: "Nom", value: "nom", checked: false },
    { label: "Prénom", value: "prenom", checked: false },
    { label: "ID", value: "id", checked: false },
  ]);

  const handleSearch = () => {
    console.log("Recherche en cours pour:", recherche);
    // Filtrer ou rechercher parmi les patients ici...
  };

  const handleClickSort = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleTriOption = (value) => {
    const newOptions = triOptions.map(option => {
      if (option.value === value) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });
    setTriOptions(newOptions);
    // Vous pouvez également implémenter la logique de tri ici...
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Patients
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Rechercher un patient"
            variant="outlined"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button startIcon={<SortIcon />} variant="contained" onClick={handleClickSort}>
            Trier
          </Button>
          <Menu
            id="sort-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {triOptions.map((option) => (
              <MenuItem key={option.value} onClick={() => handleToggleTriOption(option.value)}>
                <Checkbox checked={option.checked} />
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {patients.map((patient) => (
          <Grid item xs={12} sm={6} md={4} key={patient.id}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar src={patient.imageUrl} sx={{ width: 80, height: 80, mb: 2 }} />
              <Typography>{`${patient.prenom} ${patient.nom}`}</Typography>
              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item>
                  <IconButton color="primary" onClick={() => console.log("Voir", patient.id)}><VisibilityIcon /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="secondary" onClick={() => console.log("Modifier", patient.id)}><EditIcon /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="error" onClick={() => console.log("Supprimer", patient.id)}><DeleteIcon /></IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
