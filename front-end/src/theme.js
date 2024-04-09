import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#77B5FE' }, // Changer en orange
    secondary:  { main: '#b3b300' }, // Change to darker yellow
    voir: { main: '#0000ff' }, // Change to blue
    supprimer: { main: '#ff0000' }, // Change to red
    modifier: { main: '#00ff00' }, // Change to green
  },
  typography: {
    // Définir la taille de la police globale à 18px
    fontSize: 18,
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
    h4: {
      fontSize: '1.75rem',
      color: 'white',
    },
    h6: {

      fontSize: '1.5rem',
    },
    
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      *::-webkit-scrollbar {
        width: 10px; // Sets the scrollbar width
      }
      
      *::-webkit-scrollbar-track {
        background-color: #f1f1f1; // Light track color for a minimal look
      }
      
      *::-webkit-scrollbar-thumb {
        background-color: #888; // Darker thumb for contrast but still smooth
        border-radius: 2px; // Slightly rounded corners for a softer look
        
        &:hover {
          background-color: #555; // Darker on hover for an interactive feel
        }
      }
    `,
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#ff7644',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ff7644',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#ff7644',
            },
          },
        },
      },
    },
  },
});

export default theme; // Assurez-vous d'utiliser export default ici
