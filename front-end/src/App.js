import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DossierPatientWrapper from "./Wrapper/DossierPatientWrapper";
import Ordonnance from "./pages/Ordonnance";
import Ordonnance2 from "./pages/Ordonnance2";

import Login from "./pages/Login";
import AddPatient from "./pages/AddPatient";
import "./App.css";
import Drawer from "./Components/Drawer";
import ListePatientsWrapper from "./Wrapper/ListePatientsWrapper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Speech from "./pages/Speech.js";
import CalendarWrapper from "./Wrapper/CalendarWrapper";
import HomeWrapper from "./Wrapper/HomeWrapper";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Ordonnance/>
    </ThemeProvider>
  );
}

export default App;
