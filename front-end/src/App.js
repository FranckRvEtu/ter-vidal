import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DossierPatientWrapper from './Wrapper/DossierPatientWrapper'; // Assurez-vous que le chemin est correct
import Ordonnance from './pages/Ordonnance';
import Login from './pages/Login';
import Dashboard from './Components/Dashboard';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import DossierPatient from './pages/DossierPatient';
import './App.css';

function App() {
  // Ici, vous pouvez définir les états et les fonctions nécessaires pour votre application

  return (
    <Router>
      <div className="App">
        {/* Ici, vous pouvez placer des composants qui doivent être affichés sur toutes les pages, comme <Header /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ordonnance" element={<Ordonnance />} />
          {/* Autres routes */}
          <Route path="/dossierPatient/:patientId" element={<DossierPatientWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
