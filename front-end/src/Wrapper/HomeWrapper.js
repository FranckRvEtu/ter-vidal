import React, { useEffect, useState } from "react";
import HomePage from "../pages/Home";

const HomeWrapper = () => {
  const [rdvs, setRdvs] = useState([]);

  // Utilisation de useEffect pour exécuter la requête fetch au chargement du composant
  useEffect(() => {
    const fetchRDVs = async () => {
      try {
        const response = await fetch("http://localhost:5000/getUpcomingRDVs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRdvs(data);
        console.log("RDVs", data);
      } catch (error) {
        console.error("Error fetching RDVs:", error);
      }
    };

    fetchRDVs();
  }, []);
  return <HomePage appointments={rdvs} />;
};

export default HomeWrapper;
