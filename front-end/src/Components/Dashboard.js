import React, { useEffect, useState } from 'react';
import '../Style/Dashboard.css'; // Assurez-vous que ce fichier contient les styles nécessaires
import iconPeople from '../Assets/iconPeople.png';
import Calendar from '../Assets/calendar.png';
import mySquare from '../Assets/grid.png';
import gear from '../Assets/setting.png';
import logout from '../Assets/logout.png';
import help from '../Assets/square.png';
import mic from '../Assets/microphone-black-shape.png';


function Dashboard() {
    const [isListening, setIsListening] = useState(false); // État pour suivre si la reconnaissance vocale est activée

    useEffect(() => {
        if (window.annyang) {
            // Définition des commandes vocales
            var commands = {
                'dashboard': () => console.log('Dashboard clicked'),
                'calendar': () => console.log('Calendar clicked'),
                'patients': () => console.log('Patients clicked'),
                'test': () => alert('test'),
                // Ajoutez d'autres commandes vocales ici
            };

            // Ajout des commandes vocales à Annyang
            window.annyang.addCommands(commands);
        }
    }, []);

    // Fonction pour démarrer ou arrêter l'écoute vocale
    const toggleListening = () => {
        if (isListening) {
            window.annyang.abort();
        } else {
            window.annyang.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div>
            
            <div className="sidebar">
                <ul id="topBar" style={{listStyleType: "none"}}>
                    <li>
                        <a className="dashboard-button" onClick={() => console.log("Dashboard clicked")}>
                            <img src={mySquare}/>
                            <span> Dashboard </span>
                        </a>
                    </li>
                    <li>
                        <a className="dashboard-button" onClick={() => console.log("Calendar clicked")}>
                            <img src={Calendar}/>
                            <span> Calendar </span>
                        </a>
                    </li>
                    <li>
                        <a className="dashboard-button" onClick={() => console.log("Patients clicked")}>
                            <img src={iconPeople}/> 
                            <span> Patients </span>
                        </a>
                    </li>
                </ul>
                <a className={`mic ${isListening ? 'active' : ''}`} onClick={toggleListening}> {/* Utilisez la fonction pour démarrer ou arrêter l'écoute vocale */}
                    <img src={mic}/>
                </a>
                <ul id="bottomBar" style={{listStyleType: "none"}}>
                    <li>
                        <a className="setting-button" onClick={() => console.log("Settings clicked")}>
                            <img src={gear}/>
                            <span> Settings </span>
                        </a>
                    </li>
                    <li>
                        <a className="setting-button" onClick={() => console.log("Help clicked")}>
                            <img src={help}/>
                            <span> Help Center </span>
                        </a>
                    </li>
                    <li>
                        <a className="setting-button" onClick={() => console.log("Logout clicked")}>
                            <img src={logout}/>
                            <span> Logout </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
