import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListePatient from "../pages/ListePatient";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const WrapperListePatients = () => {
  const [listePatients, setListePatients] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();   


  useEffect(() => {
    let isMonted = true;
    const controller = new AbortController();

    axiosPrivate.get(
      "http://localhost:5000/allPatients", {
        signal : controller.signal
      }) // Correction ici  
      .then((response) => {
        console.log('Status:', response.status);
        console.log('Status text:', response.statusText);
        console.log(response); // Affiche la réponse brute dans la console
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data; // Continue le traitement en convertissant la réponse en JSON
      })
      .then((data) => {
        console.log("DATA");
        console.log(data); // Affiche les données JSON récupérées
        isMonted && setListePatients(data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/login", {state: {from: location}, replace: true})
      });
  }, []);
  console.log("LISTE PATIENTS");
  console.log(listePatients);
  return <ListePatient patientsInitiaux={listePatients} />;
};

export default WrapperListePatients;
