import { createTheme } from "@mui/material/styles";

const primaryMain = "#04498e";
const primaryLight = "#006fdf";
const primaryLight2 = "#007cfa";
const primaryLight3 = "#0352a2";
const light = "#f1f1f1";
const primaryDark = " #073666";
const primaryDark2 = "#0061c3";
const dark = "#081C15";
const backgroundDefault = "#0a1929";

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
    color: "white",
    // Spécifier la famille de polices globale
    fontFamily: "'Roboto', sans-serif",
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
            color: "white", // Utilisation de la variable
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
