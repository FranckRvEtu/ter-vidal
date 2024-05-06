import { createTheme } from "@mui/material/styles";

const primaryMain = "#04498e";
const primaryLight = "#006fdf";
const primaryLight2 = "#007cfa";
const primaryLight3 = "#0352a2";
const light = "#f1f1f1";
const primaryDark = " #001e3c";
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
    allVariants: {
      color: "white",
    }, // Spécifier la famille de polices globale
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
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(45deg, ${primaryLight2} 0%, ${primaryDark2} 100%)`,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      html {
        color: white; // Set default text color to white for all text
      }

      *::-webkit-scrollbar {
        width: 0px; // Sets the scrollbar width
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
          "& label": {
            color: primaryMain, // Color for the label when it is not focused
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: primaryMain, // Underline color before it is focused
          },
          "& .MuiInputBase-input": {
            color: "white", // Change input text color to white for outlined text fields
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: primaryMain, // Border color before it is focused
            },
            "& .MuiInputBase-input::placeholder": {
              // Style for placeholder text
              color: "white", // Set placeholder text color to white
              opacity: 1, // Ensures that the placeholder text is not semi-transparent
            },
          },
          "& .MuiInputBase-input::placeholder": {
            // This applies to both variants if needed
            color: "white", // Change placeholder text color to white
            opacity: 1, // Ensures that the placeholder text is fully visible
          },
        },
      },
    },
  },
});

export default theme; // Assurez-vous d'utiliser export default ici
