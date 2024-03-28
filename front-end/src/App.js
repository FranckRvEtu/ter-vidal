import Ordonnance from './pages/Ordonnance';
import Login from './pages/Login';
import './App.css';
import Dashboard from './Components/Dashboard';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import DossierPatient from './pages/DossierPatient';
function App() {

  const Patient = {
    nom: "Doe",
    prenom: "John",
    sexe: "M",
    taille: 180,
    poids: 80,
    dateNaissance: "1990-01-01",
    groupeSanguin: "O+"
  };
  const ordonnancesExemple = [
    {
      "_id": "65fb4081776fbb5e5df58a71",
      "date": "2024-03-20T20:01:05.009Z",
      "idPatient": "65fb4081776fbb5e5df58a70",
      "Prescription": [],
      "__v": 0
    },
    {
      "_id": "65fb4081776fbb5e5df58a72",
      "date": "2024-02-20T20:01:05.009Z",
      "idPatient": "65fb4081776fbb5e5df58a70",
      "Prescription": [],
      "__v": 0
    }
  ];
  const rdvsExemple = [
    
    {
      "_id": "507f1f77bcf86cd799439012",
      "date": new Date(2024, 3, 20, 14, 0), // 20 Avril 2024
      "idPatient": "507f191e810c19729de860eb",
      "lieu": "Hôpital B"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "date": new Date(2024, 3, 25, 11, 15), // 25 Avril 2024
      "idPatient": "507f191e810c19729de860ec",
      "lieu": "Clinique C"
    }
  
  ];

  const AntecedantExemple = [
    {
      "_id" : "65fb408",
      "diagnostic": "Grippe",
      "date": "2024-03-20T20:01:05.009Z",
      "description": "Symptômes : fièvre, toux, fatigue"
    },
    
    {
      "_id" : "65fb409",
      "diagnostic": "Angine",
      "date": "2024-02-20T20:01:05.009Z",
      "description": "Symptômes : maux de gorge, fièvre"
    }
  ];
  return (
    <div className="App">

      <DossierPatient patient={Patient} ordonnances={ordonnancesExemple} rdvs={rdvsExemple} antecedants={AntecedantExemple}/>
      
    </div>
  );
}

export default App;
