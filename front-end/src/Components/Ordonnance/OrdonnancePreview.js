import React from 'react';
import '../../Style/Ordonnance.css';
import signature from '../../Assets/signature.png';
import rpps from '../..//Assets/rpps.png';

const OrdonnancePreview = ({ patient, docteur, cabinet, medicaments, comment }) => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1; // JavaScript months are 0-based counting
    const year = today.getFullYear();
    
    function getMonthName(month) {
        switch (month) {
        case 1:
            return 'Janvier';
        case 2:
            return 'Février';
        case 3:
            return 'Mars';
        case 4:
            return 'Avril';
        case 5:
            return 'Mai';
        case 6:
            return 'Juin';
        case 7:
            return 'Juillet';
        case 8:
            return 'Août';
        case 9:
            return 'Septembre';
        case 10:
            return 'Octobre';
        case 11:
            return 'Novembre';
        case 12:
            return 'Décembre';
        default:
            return '';
        }
    }
    
    const formattedDate = `${date} ${getMonthName(month)} ${year}`;
    const patientDate = new Date(patient.birthdate);
    const diff = (year - patientDate.getFullYear())-1;
    let patientAge = month > patientDate.getMonth() ? diff+1 :diff;
    
    if (month === patientDate.getMonth()) {
        if (date >= patientDate.getDate()) {
            patientAge++;
        }
    }
    if (patientAge <2){
        let patientMonths = month - patientDate.getMonth() - 1;
        if (patientMonths < 0){
            patientMonths = 12 + patientMonths;
        }
        patientAge = patientMonths + ' mois'; 
    }

    if (patientAge === '0 mois') {
        patientAge = date - patientDate.getDate() + ' jours';
    }

    if (typeof patientAge === 'number') {
        patientAge = patientAge + ' ans';
    }
    return (
        <div className='preview'>
        <div className='preview-header'>
            <div className='info-docteur'>
            <p>Docteur {docteur.prenom} {docteur.nom}</p>
            <p>{docteur.specialite}</p><hr/>
            <p className='credentials'>{docteur.credentials}</p><hr/>
            <img src={rpps} alt="RPPS" />
            </div>
            <div className='info-cabinet'>
            <p>{cabinet.adresse}</p>
            <p>{cabinet.codePostal} {cabinet.ville}</p><hr/>
            <p>Tél cabinet : {cabinet.telephone}</p>
            <p>Tél urgences : {cabinet.telephoneUrg}</p>
            <p>{formattedDate}</p>
            </div>
        </div>
        <div className='preview-body'>
            <div className='info-patient'>
            <p>{patient.sexe === 'Masculin' ? 'Monsieur' : 'Madame'} {patient.firstname} {patient.name}</p>
            <p>Age: {patientAge} , {patient.weight} kg</p>
            </div>
            <div className='info-medicaments'>
            {medicaments.map((med, index) => (
                <div className='medicament' key={index}>
                <p className='nom-med'>{med.Medicament}</p> 
                <p className='posologie-med'>{med.Posologie} </p>
                <p className='commentaire-med'>{med.Remarque}</p>
                </div>
            ))}
            </div>
            <div className='com-gen'>
                <p>{comment}</p>  
            </div>
            <div className='signature'>
                <p>Signature</p>
                <img src={signature} alt="Doctor's Signature" />
            </div>
            </div>
            <div className='preview-footer'>
                <hr/><p>Le réglement des honoraires par chèque est accepté</p>
            </div>
        </div>  
    );    
}

export default OrdonnancePreview;