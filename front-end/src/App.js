import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DossierPatientWrapper from "./Wrapper/DossierPatientWrapper";
import Ordonnance from "./pages/Ordonnance";
import Antecedant from "./pages/Antecedant";
import Login from "./pages/Login";
import AddPatient from "./pages/AddPatient";
import "./App.css";
import Drawer from "./Components/Drawer";
import ListePatientsWrapper from "./Wrapper/ListePatientsWrapper";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";  
import CalendarWrapper from "./Wrapper/CalendarWrapper";
import HomeWrapper from "./Wrapper/HomeWrapper";
import RequireAuth from "./Components/RequireAuth";
import {AuthProvider} from "./context/AuthProvider";
import Layout from "./Components/Layout";
import UpdatePatientWrapper from "./Wrapper/UpdatePatientWrapper";

function App() {
  return (
    <><Drawer />
      <Routes>
        <Route path="/" element={<Layout />}>

          {/*public routes:*/}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />

          {/*private routes:*/}
          <Route element={<RequireAuth />}>
            <Route path="/ " element={<HomeWrapper />} />
            <Route path="/ordonnance/:patientId" element={<Ordonnance />} />
            <Route path="/addAntecedant/:patientId"element={<Antecedant />} />
            <Route path="/addPatient" element={<AddPatient />} />
            <Route
              path="/dossierPatient/:patientId"
              element={<DossierPatientWrapper />} />
            <Route
              path="/editPatient/:patientId"
              element={<UpdatePatientWrapper />} />
            <Route path="/listePatient" element={<ListePatientsWrapper />} />
            <Route path="/agenda" element={<CalendarWrapper />} />
          </Route>
        </Route>
      </Routes>
    </>
    //</Drawer>

  );
}

export default App;
