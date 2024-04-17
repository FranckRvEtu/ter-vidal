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
import CalendarWrapper from "./Wrapper/CalendarWrapper";
import HomeWrapper from "./Wrapper/HomeWrapper";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Drawer />
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ordonnance/:patientId" element={<Ordonnance2 />} />
          <Route path="/addPatient" element={<AddPatient />} />

          <Route
            path="/dossierPatient/:patientId"
            element={<DossierPatientWrapper />}
          />
          <Route path="/listePatient" element={<ListePatientsWrapper />} />
          <Route path="/agenda" element={<CalendarWrapper />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
