// WrapperComponent.js
import React, { useState, useEffect } from "react";
import ListePatient from "../pages/ListePatient";

const WrapperListePatients = () => {
  const [listePatients, setListePatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:11000/allPatients") // Correction ici
      .then((response) => {
        console.log(response); // Affiche la réponse brute dans la console
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Continue le traitement en convertissant la réponse en JSON
      })
      .then((data) => {
        console.log("DATA");
        console.log(data); // Affiche les données JSON récupérées
        setListePatients(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des patients:", error)
      );
  }, []);
  console.log("LISTE PATIENTS");
  console.log(listePatients);
  return <ListePatient patientsInitiaux={listePatients} />;
};

export default WrapperListePatients;
