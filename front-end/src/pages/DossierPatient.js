import * as React from 'react';
import { styled, useTheme, createTheme } from '@mui/material/styles';
import {Box, Avatar,Paper,Typography,List,ListItem,ListItemText } from '@mui/material'; 
import { format } from 'date-fns';


const theme = createTheme({
    palette: {
      primary: { main: '#ff7644' }, // Changer en orange
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& label.Mui-focused': {
              color: '#ff7644', // Couleur du label lors du focus
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#ff7644', // Couleur de la ligne en dessous du TextField
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#ff7644', // Couleur de la bordure pour le variant 'outlined'
              },
            },
          },
        },
      },
    },
  });

  
export default function DossierPatient({patient,ordonnances=[],rdvs=[],antecedants=[]}) {

    const handleOrdonnanceClick = (id) => {
        // Ici, vous pouvez faire une requête à votre backend pour récupérer l'ordonnance par son ID
        console.log(`Ordonnance ID: ${id} cliqué. Effectuer une requête pour récupérer les détails.`);
        // Exemple : fetch(`/api/ordonnances/${id}`).then(...)
      };

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
    <Paper>
        Dossier Patient
        <Paper
      sx={{
        m: 2,
        p: 2, // Ajoutez du padding à Paper
        display: 'flex', // Utilisez flexbox pour disposer les éléments côte à côte
        alignItems: 'center', // Centre verticalement les éléments dans le flex container
        justifyContent: 'space-between', // Répartissez l'espace également entre les éléments
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src="" 
          sx={{ width: 56, height: 56, borderRadius: 0 }} 
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography>
          Nom: {patient.nom}<br />
          Prénom:{patient.prenom}
        </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography>
          sexe: {patient.sexe} <br />
          taille: {patient.taille} <br />
          poids:{patient.poids}
        </Typography>
        </Box> 

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography>
          Date de naissance: {patient.dateNaissance} <br />
          groupe sanguin: {patient.groupeSanguin}
        </Typography>
      </Box>
      
    </Paper>

    <Paper>
        Ordonnances
    <List>
           {ordonnances && ordonnances.map((ordonnance) => (
  <ListItem key={ordonnance._id} button onClick={() => handleOrdonnanceClick(ordonnance._id)}>
    <ListItemText 
      primary={`Date d'ordonnance : ${format(new Date(ordonnance.date), 'dd/MM/yyyy')}`} 
    />
  </ListItem>
))}

    </List>


    </Paper>

    
    <Paper sx={{ margin: 2, padding: 2 }}>
      <List>
        {rdvs && rdvs.map(rdv => (
          <ListItem key={rdv._id} sx={{ marginBottom: 1 }}
          button onClick={() => handleRDVClick(rdv._id)}
          >
            <ListItemText
              primary={`Rendez-vous le ${format(new Date(rdv.date), 'dd/MM/yyyy à HH:mm')}`}
              secondary={`Lieu : ${rdv.lieu}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
    <Paper sx={{ margin: 2, padding: 2 }}>
    <List>
  {antecedants && antecedants.map(antecedant => (
    <ListItem 
      key={antecedant._id} 
      sx={{ marginBottom: 1 }}
      button 
      onClick={() => handleAntecedantClick(antecedant._id)}
    >
      <ListItemText 
        primary={`Antécédant : ${antecedant.diagnostic}`} 
      />
    </ListItem>
  ))}
</List>

    </Paper>
    </Paper>
    
    );
}