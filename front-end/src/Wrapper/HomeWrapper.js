import React, { useEffect, useState } from "react";
import HomePage from "../pages/Home";

const HomeWrapper = () => {
  // Utilisation de useState pour initialiser l'état des RDVs
  const [rdvs, setRdvs] = useState([]);

  // Utilisation de useEffect pour exécuter la requête fetch au chargement du composant
  useEffect(() => {
    // Définition de la fonction fetchRDVs comme asynchrone
    const fetchRDVs = async () => {
      try {
        const response = await fetch("http://localhost:5000/getUpcomingRDVs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRdvs(data); // Mise à jour de l'état avec les données récupérées
        console.log("RDVs", data);
      } catch (error) {
        console.error("Error fetching RDVs:", error);
      }
    };

    fetchRDVs(); // Appel de la fonction fetchRDVs
  }, []); // Le tableau vide indique que l'effet ne dépend d'aucune valeur et ne s'exécutera qu'au montage du composant

  // Passage de l'état rdvs en props au composant HomePage
  return <HomePage appointments={rdvs} />;
};

export default HomeWrapper;
