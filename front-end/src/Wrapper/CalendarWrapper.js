import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../pages/Calendar';


const CalendarWrapper = () => {

    const [listRDV, setListRDV] = useState([]);

    const fetchPatientName = async (idPatient) => {
        // Remplacez cette URL par l'URL de votre API
        const response = await fetch(`http://localhost:3002/getPatient/${idPatient}`);
        console.log("response", response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log("response", response);
        const patientData = await response.json();
        return patientData.name; // Assurez-vous que 'name' est la bonne propriété pour le nom du patient
    }
    
    const convertlist = (oldList) => {
        return oldList.map(item => {
            let startDate = new Date(item.date);
            let endDate = new Date(item.date);
            endDate.setMinutes(endDate.getMinutes() + 30);
            return {
                title: fetchPatientName(item.idPatient),
                start: startDate.toISOString().slice(0, -5),
                end: endDate.toISOString().slice(0, -5),
                extendedProps: {
                    department: item.lieu,
                },
                description: item.lieu
                };
        });
    }

    const fetchRDV = async () => {
        try {
            const response = await fetch(`http://localhost:3000/getWeekRDV`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const listRDV = await response.json();
                console.log("LIST RDV");
                console.log(convertlist(listRDV));
                setListRDV(convertlist(listRDV));
            } else {
                console.log("Oops, we haven't got JSON!");
            }
        } catch (e) {
            console.error('Erreur lors de la récupération des RDV:', e);
        }
    };

    useEffect(() => {
        fetchRDV();
    }, []);

    return (
        <Calendar listRDV={listRDV || []}/>
    );

}

export default CalendarWrapper;
