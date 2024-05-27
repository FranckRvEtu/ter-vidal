import React, { useEffect, useState } from "react";
import HomePage from "../pages/Home";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { axiosPrivate } from "../../api/axios";

const HomeWrapper = () => {
  const [rdvs, setRdvs] = useState([]);
  const axiosPrivate = useAxiosPrivate(); 
  // Utilisation du hook useAxiosPrivate pour obtenir l'instance axios avec le token d'authentification
  const location = useLocation();
  const navigate = useNavigate();
  const controller = new AbortController();

  // Utilisation de useEffect pour exécuter la requête fetch au chargement du composant
  useEffect(() => {
    const fetchRDVs = async () => {
      try {
        const response = await axiosPrivate("http://localhost:5000/getUpcomingRDVs", 
        {signal: controller.signal}
      );
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
