import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "../pages/Calendar";
import axiosPrivate from "../../api/axios";

const CalendarWrapper = () => {
  console.log("calendarWrapper");
  const [listRDV, setListRDV] = useState([]);

  const fetchPatientName = async (idPatient) => {
    let patientData;
    console.log("fetch patient est bien call");
    try {
      const response = await axiosPrivate.get(
        `http://localhost:5000/getPatient/${idPatient}`
      );
      
      console.log("haaaaaaaaaaaaaaaaaaaaaaa");
      if (!response.ok) {
        console.log("bhe non enfait");
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        patientData = await response.json();
        console.log("pdata", patientData.name);
      } else {
        console.log("c'est pas du json frr");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }

    return patientData.name;
  };

  const convertlist = async (oldList) => {
    console.log("convert est bien call");
    const newlist = await Promise.all(
      oldList.map(async (item) => {
        console.log("slam", item);
        console.log("ouioui", item.idPatient);
        const patientName = await fetchPatientName(item.idPatient);
        console.log("nonon");
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
      const response = await fetch(`http://localhost:3000/getWeekRDV`);
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
        console.log("Oops, we haven't got JSON!");
      }
    } catch (e) {
      console.error("Erreur lors de la récupération des RDV:", e);
    }
  };

  useEffect(() => {
    fetchRDV();
  }, []);

  return <Calendar listRDV={listRDV || []} />;
};

export default CalendarWrapper;
