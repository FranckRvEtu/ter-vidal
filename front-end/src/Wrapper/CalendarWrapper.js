import React, { useEffect, useState } from "react";
import Calendar from "../pages/Calendar";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CalendarWrapper = () => {
  const [listRDV, setListRDV] = useState([]);
  const axiosPrivate = useAxiosPrivate();   
  const location = useLocation();
  const navigate = useNavigate();
  const controller = new AbortController();

  const fetchPatientName = async (idPatient) => {
    let patientData;
    console.log("fetch patient est bien call");
    try {
      const response = await axiosPrivate.get(
        `http://localhost:5000/getPatient/${idPatient}`,
        {signal : controller.signal}
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        patientData = await response.json();
        console.log("pdata", patientData.name);
      } else {
        console.log("not json!");
      }
    } catch (error) {
      console.log("An error occurred:", error);
      navigate("/login", {state: {from: location}, replace: true})
    }

    return patientData.name;
  };

  const convertlist = async (oldList) => {
    console.log("convertlist est bien call");
    const newlist = await Promise.all(
      oldList.map(async (item) => {
        const patientName = await fetchPatientName(item.idPatient);
        let startDate = new Date(item.date);
        let endDate = new Date(item.date);
        endDate.setMinutes(endDate.getMinutes() + 30);
        console.log("oui bonjour", patientName);
        return {
          title: patientName,
          start: startDate.toISOString().slice(0, -5),
          end: endDate.toISOString().slice(0, -5),
          extendedProps: {
            department: item.lieu,
          },
          description: item.lieu,
        };
      })
    );
    return newlist;
  };

  const fetchRDV = async () => {
    console.log("fetch rdv est bien call");
    try {
      const response = await axiosPrivate.get(`http://localhost:4000/getWeekRDV`, 
      {signal : controller.signal}
    );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const listRDV = await response.json();
        const newl = await convertlist(listRDV);
        console.log("LIST RDV", newl);
        setListRDV(newl);
      } else {
        console.log(" not JSON!");
      }
    } catch (e) {
      console.error("Erreur lors de la récupération des RDV:", e);
      //navigate("/login", {state: {from: location}, replace: true})
    }
  };

  useEffect(() => {
    fetchRDV();
  }, []);

  return <Calendar listRDV={listRDV || []} />;
};

export default CalendarWrapper;
