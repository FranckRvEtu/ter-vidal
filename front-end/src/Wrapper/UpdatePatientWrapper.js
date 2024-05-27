import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdatePatient from "../pages/UpdatePatient";

const UpdatePatientWrapper = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { patientId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:11000/getPatient/${patientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPatientData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <UpdatePatient patient={patientData} />;
};

export default UpdatePatientWrapper;
