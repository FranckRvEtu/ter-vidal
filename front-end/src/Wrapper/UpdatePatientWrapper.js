import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdatePatient from "../pages/UpdatePatient";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UpdatePatientWrapper = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { patientId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get(`http://localhost:11000/getPatient/${patientId}`)
      .then((response) => {
        if (!response.status === 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
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
