import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#ff7644' }, // Changer en orange
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
        body {
          scrollbar-width: thin; /* pour Firefox */
          scrollbar-color: #888 #f1f1f1; /* couleur de la barre de défilement pour Firefox */
        }
        
        /* Styles de la barre de défilement pour Chrome, Edge, et Safari */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
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
