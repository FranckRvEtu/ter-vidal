import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DossierPatient from "../pages/DossierPatient";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const DossierPatientWrapper = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState({});
  const [ordonnances, setOrdonnances] = useState([]);
  const [rdvs, setRdvs] = useState([]);
  const [antecedants, setAntecedants] = useState([]);
  const [visites, setVisites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const controller = new AbortController();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          `http://localhost:11000/getPatient/${patientId}`,
          { signal: controller.signal }
        );
        if (!response.status === 200) {
          throw new Error("Network response was not ok");
        }
        const patientData = response.data;
        console.log("PATIENT DATA");
        console.log(patientData);
        setPatientData(patientData);

        // Récupérer les ordonnances si listIDOrdo est présent
        if (patientData.listIDOrdo && patientData.listIDOrdo.length > 0) {
          fetchOrdonnances(patientData.listIDOrdo);
        }

        // Récupérer les rdvs si listIDrdv est présent
        if (patientData.listIDrdv && patientData.listIDrdv.length > 0) {
          fetchRdvs(patientData.listIDrdv);
        }

        // Récupérer les antecedants si antecedant est présent
        if (patientData.antecedant && patientData.antecedant.length > 0) {
          fetchAntecedants(patientData.antecedant);
        }

        // Récupérer les visites si listIDVisite est présent
        if (patientData.listIDvisite && patientData.listIDvisite.length > 0) {
          fetchVisites(patientData.listIDvisite);
        }
      } catch (e) {
        setError(e.toString());
        //navigate("/login", {state: {from: location}, replace: true})
      } finally {
        setLoading(false);
      }
    };

    // Fetch ordonnances based on IDs
    const fetchOrdonnances = async (ids) => {
      try {
        const promises = ids.map((id) =>
          axiosPrivate
            .get(`http://localhost:3000/getOrdonnance/${id}`, {
              signal: controller.signal,
            })
            .then((response) => {
              if (!response.status === 200)
                throw new Error(`Failed to fetch ordonnance with ID: ${id}`);

              return response.data;
            })
        );
        const ordonnancesData = await Promise.all(promises);
        console.log("ORDONNANCES");
        console.log(ordonnancesData);
        setOrdonnances(ordonnancesData);
      } catch (error) {
        console.error("Error fetching ordonnances:", error);
        setError(error.toString());
      }
    };

    // Fetch rendez-vous based on IDs
    const fetchRdvs = async (ids) => {
      try {
        const promises = ids.map((id) =>
          axiosPrivate
            .get(`http://localhost:5000/getRDV/${id}`, {
              signal: controller.signal,
            })
            .then((response) => {
              if (!response.status === 200)
                throw new Error(`Failed to fetch RDV with ID: ${id}`);
              return response.data;
            })
        );
        const rdvsData = await Promise.all(promises);
        console.log("RDVS");
        console.log(rdvsData);

        setRdvs(rdvsData);
      } catch (error) {
        console.error("Error fetching RDVs:", error);
        setError(error.toString());
      }
    };
    // Fetch antecedants based on IDs
    const fetchAntecedants = async (ids) => {
      try {
        const promises = ids.map((id) =>
          axiosPrivate
            .get(`http://localhost:11000/getAntecedant/${id}`, {
              signal: controller.signal,
            })
            .then((response) => {
              if (!response.status === 200)
                throw new Error(`Failed to fetch antecedant with ID: ${id}`);

              return response.data;
            })
        );
        const antecedantsData = await Promise.all(promises);
        console.log("ANTCEDANTS");
        console.log(antecedantsData);
        setAntecedants(antecedantsData);
      } catch (error) {
        console.error("Error fetching antecedants:", error);
        setError(error.toString());
      }
    };
    const fetchVisites = async (ids) => {
      try {
        const promises = ids.map((id) =>
          axiosPrivate
            .get(`http://localhost:8000/getVisite/${id}`, {
              signal: controller.signal,
            })
            .then((response) => {
              if (!response.status === 200)
                throw new Error(`Failed to fetch visite with ID: ${id}`);

              return response.data;
            })
        );
        const visitesData = await Promise.all(promises);
        console.log("VISITES");
        console.log(visitesData);
        setVisites(visitesData);
      } catch (error) {
        console.error("Error fetching visites:", error);
        setError(error.toString());
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <DossierPatient
      patient={patientData}
      ordonnances={ordonnances || []}
      rdvs={rdvs || []}
      antecedants={antecedants || []}
      visites={visites || []}
    />
  );
};

export default DossierPatientWrapper;
