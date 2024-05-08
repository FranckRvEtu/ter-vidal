import React, { useState, useEffect } from "react";
import ListePatient from "../pages/ListePatient";

const WrapperListePatients = () => {
  const [listePatients, setListePatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:11000/allPatients")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("DATA");
        console.log(data);
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
