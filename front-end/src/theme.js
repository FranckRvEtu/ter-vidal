import { createTheme } from "@mui/material/styles";

const primaryMain = "#2D6A4F";
const primaryLight = "#74C69D";
const primaryLight2 = "#95D5B2";
const primaryLight3 = "#B7E4C7";
const light = "#f1f1f1";
const primaryDark = "#40916C";
const primaryDark2 = "#1B4332";
const dark = "#081C15";
const backgroundDefault = "#f1f1f1";

const theme = createTheme({
  palette: {
    primary: { main: primaryMain },
    primaryLight: { main: primaryLight },
    primaryLight2: { main: primaryLight2 },
    primaryLight3: { main: primaryLight3 },
    light: { main: light },
    primaryDark: { main: primaryDark },
    primaryDark2: { main: primaryDark2 },
    dark: { main: dark },
    background: { default: backgroundDefault },
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
            color: primaryLight, // Utilisation de la variable
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: primaryLight, // Utilisation de la variable
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: primaryLight, // Utilisation de la variable
            },
          },
        },
      },
    },
  },
});

export default theme; // Assurez-vous d'utiliser export default ici
