import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DossierPatient from '../pages/DossierPatient';

const DossierPatientWrapper = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState({});
  const [ordonnances, setOrdonnances] = useState([]);
  const [rdvs, setRdvs] = useState([]);
  const [antecedants, setAntecedants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:11000/getPatient/${patientId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const patientData = await response.json();
        setPatientData(patientData);

        // Récupérer les ordonnances si listIDOrdo est présent
        if (patientData.listIDOrdo && patientData.listIDOrdo.length > 0) {
          fetchOrdonnances(patientData.listIDOrdo);
        }
        
        // Récupérer les rdvs si listIDrdv est présent
        if (patientData.listIDrdv && patientData.listIDrdv.length > 0) {
          fetchRdvs(patientData.listIDrdv);
        }
        if (patientData.antecedant && patientData.antecedant.length > 0) {
            fetchAntecedants(patientData.antecedant);
          }
      } catch (e) {
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    };

    // Fetch ordonnances based on IDs
    const fetchOrdonnances = async (ids) => {
      try {
        const promises = ids.map(id => 
          fetch(`http://localhost:3000/getOrdonnance/${id}`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch ordonnance with ID: ${id}`);
            return response.json();
          })
        );
        const ordonnancesData = await Promise.all(promises);
        setOrdonnances(ordonnancesData);
      } catch (error) {
        console.error("Error fetching ordonnances:", error);
        setError(error.toString());
      }
    };

    // Fetch rendez-vous based on IDs
    const fetchRdvs = async (ids) => {
      try {
        const promises = ids.map(id => 
          fetch(`http://localhost:3010/getRdv/${id}`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch RDV with ID: ${id}`);
            return response.json();
          })
        );
        const rdvsData = await Promise.all(promises);
        setRdvs(rdvsData);
      } catch (error) {
        console.error("Error fetching RDVs:", error);
        setError(error.toString());
      }
    };

    const fetchAntecedants = async (ids) => {
        try {
          const promises = ids.map(id => 
            fetch(`http://localhost:11000/getAntecedant/${id}`)
            .then(response => {
              if (!response.ok) throw new Error(`Failed to fetch antecedant with ID: ${id}`);
              return response.json();
            })
          );
          const antecedantsData = await Promise.all(promises);
          setAntecedants(antecedantsData);
        } catch (error) {
          console.error("Error fetching antecedants:", error);
          setError(error.toString());
        }
      };
    fetchPatientData();
  }
  , [patientId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <DossierPatient
      patient={patientData}
      ordonnances={ordonnances}
      rdvs={rdvs}
      antecedants={patientData.antecedants || []}
    />
  );
};

export default DossierPatientWrapper;
