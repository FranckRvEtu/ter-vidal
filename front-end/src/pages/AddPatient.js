import * as React from 'react';
import { ThemeProvider, Container,  Box, TextField, Button, Input, InputAdornment } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import createTheme from '@mui/material/styles/createTheme';


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
//pour les couleurs si besoin 

export default function AddPatient() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const patient = {
      firstname: data.get('firstname'),
      name: data.get('name'),
      sexe : data.get('sex'),
      birthdate : data.get('birthdate'),
      BloodType : data.get('bloodtype'),
      height : data.get('height'),
      weight : data.get('weight'),
      antecedant : [],
      listIDOrdo : [],
      listIDrdv : [],
      listIDvisite : []
    };
    console.log(patient);
    fetch('http://localhost:11000/addPatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({patient})
      })
      .then(response => {
        if (response.ok) {
          console.log('Patient bien ajouté', patient);
        } else {
          console.error('Erreur lors de l\'envoi du patient');
        }
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi du patient', error);
      });
}
  return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" sx={{mt: 20}} >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

              <LocalizationProvider dateAdapter= {AdapterDayjs}>
                <DatePicker 
                  label = 'Date de naissance'
                  name = 'birthdate'
                  id = 'birthdate'
                  views={['year', 'month', 'day']}
                />
              </LocalizationProvider>

             
              <TextField
                  variant='standard'
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
                  variant='standard'
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
                  variant='standard'
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
                  variant='standard'
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
                  variant='standard'
                  margin="normal"
                  required
                  fullWidth
                  name="height"
                  label="Height"
                  type="height"
                  id="height"
                  autoComplete="height"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                  }}
              />
              <TextField
                  variant='standard'
                  margin="normal"
                  required
                  fullWidth
                  name="weight"
                  label="Weight"
                  type="weight"
                  id="weight"
                  autoComplete="weight"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
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
        </ThemeProvider>
);
}
