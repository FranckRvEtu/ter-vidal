import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Menu,
  MenuItem,
  Checkbox
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ListePatient({ patientsInitiaux = []}) {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [triOptions, setTriOptions] = useState([
    { label: "Nom", value: "name", checked: false },
    { label: "Prénom", value: "firstname", checked: false },
    { label: "ID", value: "_id", checked: false },
  ]);
  const [patientsAffiches, setPatientsAffiches] = useState(patientsInitiaux);

  useEffect(() => {
    let resultats = [...patientsInitiaux];
    
    // Filtrage
    if (recherche) {
      resultats = resultats.filter(patient =>
        patient.name?.toLowerCase().includes(recherche.toLowerCase()) ||
        patient.firstname?.toLowerCase().includes(recherche.toLowerCase())
      );
    }

    // Tri
    resultats.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    setPatientsAffiches(resultats);
  }, [recherche, triOptions, patientsInitiaux]);

  const handleSearch = () => {
    console.log("Recherche en cours pour:", recherche);
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
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mt: 8 }} >
        <Grid item xs={8}    >
          <TextField
            fullWidth
            label="Rechercher un patient"
            variant="standard"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}><SearchIcon /></IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button startIcon={<SortIcon />} variant="contained" onClick={handleClickSort}>
            Trier
          </Button>
          <Menu id="sort-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {triOptions.map((option) => (
              <MenuItem key={option.value} onClick={() => handleToggleTriOption(option.value)}>
                <Checkbox checked={option.checked} />{option.label}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <Paper sx={{ minHeight:200,maxHeight: 700, overflow: 'auto', mt: 2, padding: 2 ,
    
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '2px',
      '&:hover': {
        backgroundColor: '#555',
      },
    }
    
    
    }}>
      <Grid container spacing={0.5} sx={{ mt: 0 }}>
        {patientsAffiches.map((patient, index) => (
          <Grid item xs={12} sm={6} md={4} key={patient._id || index}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar src={patient.imageUrl} sx={{ width: 73, height: 73, mb: 2 }} />
              <Typography>{`${patient.firstname} ${patient.name}`}</Typography>
              <Grid container spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
              <Grid item>
                <IconButton 
                    
                    color="voir" 
                    onClick={() => navigate(`/dossierPatient/${patient._id}`)}
                >
                    <VisibilityIcon />
                </IconButton>
                </Grid>

                <Grid item>
                  <IconButton color="modifier" onClick={() => console.log("Modifier", patient._id)}><EditIcon /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="supprimer" onClick={() => console.log("Supprimer", patient._id)}><DeleteIcon /></IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate('/addPatient')}
      >
        Ajouter un Patient
      </Button>
    </Container>
  );
}
