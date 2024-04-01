import * as React from 'react';
import {Button,Box, Avatar,Paper,Typography,List,ListItem,ListItemText } from '@mui/material'; 
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider,GlobalStyles } from '@mui/material/';
import { Grid } from '@mui/material';
import { ListItemIcon } from '@mui/material';

  
export default function DossierPatient({patient,ordonnances=[],rdvs=[],antecedants=[],visites=[]}) {
    const navigate = useNavigate();
    const handleOrdonnanceClick = (id) => {
        // Ici, vous pouvez faire une requête à votre backend pour récupérer l'ordonnance par son ID
        console.log(`Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`);
        // Exemple : fetch(`/api/ordonnances/${id}`).then(...)
      };

      const handleVisiteClick = (id) => {
        // Ici, vous pouvez faire une requête à votre backend pour récupérer l'ordonnance par son ID
        console.log(`Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`);
        // Exemple : fetch(`/api/ordonnances/${id}`).then(...)
      }
      const handleRDVClick = (id) => {
        // Ici, vous pouvez faire une requête à votre backend pour récupérer l'ordonnance par son ID
        console.log(`Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`);
        // Exemple : fetch(`/api/ordonnances/${id}`).then(...)
      };

      const handleAntecedantClick = (id) => {
        // Ici, vous pouvez faire une requête à votre backend pour récupérer l'ordonnance par son ID
        console.log(`Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`);
        // Exemple : fetch(`/api/ordonnances/${id}`).then(...)
      };

return (
    
    <Box sx={{ display: 'flex',alignItems:'flex-start', justifyContent: 'space-between', mt: 10 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', mr: 2 }}>
    <Button
        variant="contained"
        color="primary"
        sx={{ p: 2, ml: 5, mt: 2, mb: 2,}}
        onClick={() => navigate(`/ordonnance/${patient._id}`)}
      >
        Accéder à Ordonnance
    </Button>
  <Paper elevation={3} sx={{ p: 2, ml: 5, mt: 2, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ textAlign: 'center', textDecoration: 'underline' , width: '100%' }}>Informations du Patient</Typography>
    <Avatar sx={{ width: 56, height: 56, mb: 5 , mt:5}} src="/path/to/patient-image.jpg" />
    {/* Conteneur pour le texte avec alignement uniforme et souligné */}
    <Box sx={{ textAlign: 'left', maxWidth: '80%', mt: 1 }}>
      <Typography sx={{ mb: 3 }}>Nom: {patient.name}</Typography>
      <Typography sx={{ mb: 3 }}>Prénom: {patient.firstname}</Typography>
      <Typography sx={{ mb: 3 }}>Sexe: {patient.sexe}</Typography>
      <Typography sx={{ mb: 3 }}>Taille: {patient.height} cm</Typography>
      <Typography sx={{ mb: 3 }}>Poids: {patient.weight} kg</Typography>
      <Typography sx={{ mb: 3 }}>Date de naissance: {format(new Date(patient.birthdate), 'dd/MM/yyyy')}</Typography>
      <Typography sx={{ mb: 3}}>Groupe sanguin: {patient.BloodType}</Typography>
    </Box>
  </Paper>
  
 
</Box>




<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mt: 2 }}>
  {/* Ligne 1 : Ordonnances et Rendez-vous */}
  <Grid container spacing={2} alignItems="flex-start">
    {/* Ordonnances */}
    <Grid item xs={12} md={6}>
    <Typography variant="h6" component="h2">Ordonnances</Typography>
      <Paper sx={{ margin: 2, padding: 2, minHeight: 300, maxWidth: 700, maxHeight: 300, overflow: 'auto' }}>
        
        <List>
          {ordonnances && ordonnances.map((ordonnance) => (
            <ListItem key={ordonnance._id} button onClick={() => handleOrdonnanceClick(ordonnance._id)}>
              <ListItemIcon>
            {/* Utilisation d'une icône stockée localement dans public/assets */}
            <img src="/Assets/prescription.png" alt="Icon" style={{ width: 24, height: 24 }} />
          </ListItemIcon>
              <ListItemText primary={`Date d'ordonnance : ${format(new Date(ordonnance.date), 'dd/MM/yyyy')}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>

    {/* Rendez-vous */}
    <Grid item xs={12} md={6}>
    <Typography variant="h6" component="h2">Rendez-vous</Typography>
      <Paper sx={{ margin: 2, padding: 2, minHeight: 300, maxWidth: 700, maxHeight: 300, overflow: 'auto' }}>
        
        <List>
          {rdvs && rdvs.map(rdv => (
            <ListItem key={rdv._id} sx={{ marginBottom: 1 }} button onClick={() => handleRDVClick(rdv._id)}>
              <ListItemText primary={`Rendez-vous le ${format(new Date(rdv.date), 'dd/MM/yyyy à HH:mm')}`} secondary={`Lieu : ${rdv.lieu}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  </Grid>

  {/* Ligne 2 : Antécédants et Visites */}
  <Grid container spacing={2} alignItems="flex-start">
    {/* Antécédants */}
    <Grid item xs={12} md={6}>
    <Typography variant="h6" component="h2">Antécédants</Typography>
      <Paper sx={{ margin: 2, padding: 2, minHeight: 300, maxWidth: 700, maxHeight: 300, overflow: 'auto' }}>
        
        <List>
          {antecedants && antecedants.map(antecedant => (
            <ListItem key={antecedant._id} sx={{ marginBottom: 1 }} button onClick={() => handleAntecedantClick(antecedant._id)}>
              <ListItemText primary={`Antécédant : ${antecedant.diagnostic}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>

    {/* Visites */}
    <Grid item xs={12} md={6}>
    <Typography variant="h6" component="h2">Visites</Typography>
      <Paper sx={{ margin: 2, padding: 2, minHeight: 300, maxWidth: 700, maxHeight: 300, overflow: 'auto' }}>
        
        <List>
          {visites && visites.map(visite => (
            <ListItem key={visite._id} sx={{ marginBottom: 1 }} button onClick={() => handleVisiteClick(visite._id)}>
              <ListItemText primary={`Visite le ${format(new Date(visite.date), 'dd/MM/yyyy à HH:mm')}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  </Grid>
</Box>

    </Box>
    );
}