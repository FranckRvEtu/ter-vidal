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
  const patient = {
    id: '123',
    nom: 'Doe',
    prenom: 'John',
    age: 30,
    weight: 70,
    sexe: 'Masculin',
  };

  const docteur = {
    prenom: 'Jane',
    nom: 'Smith',
    specialite: 'Cardiologue',
    credentials: 'Diplomé de la Faculté de Médecine de Paris',
  };

  const cabinet = {
    adresse: '12 rue de la Paix',
    codePostal: '75001',
    ville: 'Paris',
    telephone: '01 23 45 67 89',
    telephoneUrg: '06 12 34 56 78',
  };

  return (
    
    <Router>
      <Drawer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/addPatient" element={<AddPatient /> }/>
        <Route path="/ordonnance/:patientId" element={<Ordonnance />} />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/dossierPatient/:patientId" element={<DossierPatientWrapper />} />
        <Route path="/listePatient" element={<ListePatientsWrapper />} />
        <Route path="/agenda" element={<CalendarWrapper />} />
      </Routes>
    </Router>

    //<Ordonnance patient={patient} docteur={docteur} cabinet={cabinet}/>

  );
}

export default App;
