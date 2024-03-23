import React from 'react';
import '../Style/Dashboard.css'; // Assure-toi que ce fichier contient les styles nécessaires
import iconPeople from '../Assets/iconPeople.png'
import Calendar from '../Assets/calendar.png'
import mySquare from '../Assets/grid.png'
function Dashboard() {
return (
    <div>
    <div className="header">
        <h1>titre APP</h1>
    </div>
    <div className="sidebar">
        <nav>
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
        </nav>
    </div>
    </div>
);


}

export default Dashboard;

