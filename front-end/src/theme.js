import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#00897b" }, // Changer en orange
    secondary: { main: "#B3E5FC" }, // Change to darker yellow
    dark: { main: "#0288D1" }, // Change to black
    voir: { main: "#0000ff" }, // Change to blue
    supprimer: { main: "#ff0000" }, // Change to red
    modifier: { main: "#00ff00" }, // Change to green
  },
  typography: {
    // Définir la taille de la police globale
    fontSize: 18,
    // Spécifier la famille de polices globale
    fontFamily: "'Helvetica Neue', sans-serif",
    h4: {
      fontSize: "1.75rem",
      color: "white",
    },
    h6: {
      fontSize: "1.5rem",
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
          "& label.Mui-focused": {
            color: "primary",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "primary",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "primary",
            },
          },
        },
      },
    },
  },
});

export default theme; // Assurez-vous d'utiliser export default ici
