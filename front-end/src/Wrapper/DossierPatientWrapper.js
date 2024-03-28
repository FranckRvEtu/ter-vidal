// DossierPatientWrapper.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DossierPatient from '../pages/DossierPatient';

const DossierPatientWrapper = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState({});
  const [ordonnances, setOrdonnances] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        // Récupérer les données du patient
        const response = await fetch(`http://localhost:11000/getPatient/${patientId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const patientData = await response.json();
        console.log(patientData);
        // Mettre à jour l'état avec les données du patient
        setPatientData(patientData);
  
        // Récupérer les données pour chaque ordonnance en utilisant les ID dans listIDOrdo
        const ordonnancesPromises = patientData.listIDOrdo.map(async (ordonnanceId) => {
            console.log(ordonnanceId);
            const ordResponse = await fetch(`http://localhost:3000/Ordonnance/getOrdonnance/${ordonnanceId}`);
            if (!ordResponse.ok) {
            throw new Error('Network Ordonnance');
          }
          return ordResponse.json();
        });
        
        // Attendre que toutes les promesses soient résolues avant de mettre à jour l'état avec les données des ordonnances
        const ordonnancesData = await Promise.all(ordonnancesPromises);
        setOrdonnances(ordonnancesData);
        
      } catch (e) {
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatientData();
  }, [patientId]);
  

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  console.log(patientData);

  // Adaptation des props à la structure attendue par DossierPatient
  return (
    <DossierPatient
      patient={patientData}
      // Assurez-vous que la structure de patientData inclut ces champs ou ajustez selon les données réelles reçues
      ordonnances={ordonnances || []}
      rdvs={patientData.rdvs || []}
      antecedants={patientData.antecedants || []}
    />
  );
};

export default DossierPatientWrapper;
