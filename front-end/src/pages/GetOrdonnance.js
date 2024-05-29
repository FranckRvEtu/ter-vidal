import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrdonnancePreview from '../Components/Ordonnance/OrdonnancePreview';
import { Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import UpdateOrdonnance from './UpdateOrdonnance';

function GetOrdonnance() {
  const { ordonnanceId } = useParams();
  const [ordonnance, setOrdonnance] = useState(null);
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

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

  const comment = 'Patient à surveiller';

  const handleUpdateClick = () => {
    navigate(`/updateOrdonnance/${ordonnanceId}`);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/deleteOrdonnance/${ordonnanceId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
  
      console.log('Ordonnance deleted');
      navigate(`/dossierPatient/${patient._id}`)
    } catch (error) {
      console.error('Failed to delete ordonnance:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordonnanceResponse = await fetch(`http://localhost:3000/getOrdonnance/${ordonnanceId}`);
        const ordonnanceData = await ordonnanceResponse.json();
        console.log('Ordonnance Data:', ordonnanceData);
        setOrdonnance(ordonnanceData);
  
        if (ordonnanceData && ordonnanceData.idPatient) {
          const patientResponse = await fetch(`http://localhost:11000/getPatient/${ordonnanceData.idPatient}`);
          const patientData = await patientResponse.json();
          console.log('Patient Data:', patientData);
          setPatient(patientData);
        }

        if (ordonnanceData && ordonnanceData.Prescription) {
          const prescriptionPromises = ordonnanceData.Prescription.map(async prescriptionId => {
            const response = await fetch(`http://localhost:3013/getPrescription/${prescriptionId}`).catch(console.error);
            const data = await response.json();
            return data;
          });
          const prescriptionData = await Promise.all(prescriptionPromises);
          console.log('Prescription Data:', prescriptionData);
          setPrescriptions(prescriptionData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [ordonnanceId]);
  
  if (!ordonnance || !patient || !prescriptions) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '150mm' }}>
        <OrdonnancePreview patient={patient} docteur={docteur} cabinet={cabinet} medicaments={prescriptions} comment={comment}/>
        <Box display="flex" justifyContent="space-between">
          <Box m={1}>
            <Button variant="contained" color="primary" onClick={handleUpdateClick}>
              Update Ordonnance
            </Button>
          </Box>
          <Box m={1}>
            <Button variant="contained" color="error" onClick={handleDeleteClick}>
              Delete Ordonnance
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default GetOrdonnance;