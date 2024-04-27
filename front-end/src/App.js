import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DossierPatientWrapper from './Wrapper/DossierPatientWrapper';
import Ordonnance from './pages/Ordonnance';
import Login from './pages/Login';
import Dashboard from './Components/Dashboard';
import AddPatient from './pages/AddPatient';
import './App.css';
import  Drawer from './Components/Drawer'; 
import ListePatient from './pages/ListePatient';
import ListePatientsWrapper from './Wrapper/ListePatientsWrapper';
import CalendarWrapper from './Wrapper/CalendarWrapper';

function App() {
  return (
    
    // <Router>
    //   <Drawer />
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/addPatient" element={<AddPatient /> }/>
    //     <Route path="/ordonnance/:patientId" element={<Ordonnance />} />
    //     <Route path="/addPatient" element={<AddPatient />} />
    //     <Route path="/dossierPatient/:patientId" element={<DossierPatientWrapper />} />
    //     <Route path="/listePatient" element={<ListePatientsWrapper />} />
    //     <Route path="/agenda" element={<CalendarWrapper />} />
    //   </Routes>
    // </Router>

    <Ordonnance />

  );
}

export default App;
