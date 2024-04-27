import React, { useState } from 'react';
import '../Style/Ordonnance.css';
// import MedicamentSection from '../Components/Ordonnance/MedicamentSection';
// import ContreIndicationsSection from '../Components/Ordonnance/ContreIndicationsSection';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import OrdonnancePreview from '../Components/Ordonnance/OrdonnancePreview';

function Ordonnance(props) {

  const patient = {
    id: '123',
    nom: 'Doe',
    prenom: 'John',
    age: 30,
    weight: 70,
    sexe: 'Masculin',
  };

  const docteur = {
    prenom: 'Jane',
    nom: 'Smith',
    specialite: 'Cardiologue',
    credentials: 'Diplomé de la Faculté de Médecine de Paris',
  };

  const cabinet = {
    adresse: '12 rue de la Paix',
    codePostal: '75001',
    ville: 'Paris',
    telephone: '01 23 45 67 89',
    telephoneUrg: '06 12 34 56 78',
  };

  const [loader, setLoader] = useState(false);

  const [medicaments, setMedicaments] = useState([]);
  const [comment, setComment] = useState('');
  
  const downloadPDF = () => {
    const capture = document.querySelector('.preview');
    setLoader(true);
    html2canvas(capture).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      setLoader(false);
      pdf.save('ordonnance.pdf');
    });
  }
  
  const ajouterMedicament = (medicament) => {
    setMedicaments(prevMedicaments => [...prevMedicaments, medicament]);
  };

  const supprimerMedicament = (index) => {
    setMedicaments(prevMedicaments => prevMedicaments.filter((_, i) => i !== index));
  };

  const validerOrdonnance = () => {
    console.log("Médicaments:", medicaments);
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Nom patient Concerné</h2>
          {/* <MedicamentSection onAjouter={ajouterMedicament} />
          <ContreIndicationsSection /> */}
            <h3>General Comments</h3>
            <textarea placeholder="Add your comments here..." onChange={e => setComment(e.target.value)}></textarea>
          <button onClick={validerOrdonnance}>Valider l'ordonnance</button>
        <div className='medlist'>
          {medicaments.map((med, index) => (
            <div key={index}>
              <p>Médicament: {med.medicament}, Posologie: {med.posologie}, Commentaire: {med.commentaire}</p>
              <button onClick={() => supprimerMedicament(index)}>Supprimer</button>
            </div>
          ))}
        </div>
      </div>
      <OrdonnancePreview patient={patient} docteur={docteur} cabinet={cabinet} medicaments={medicaments} comment={comment} />
      <div className='button-container'>
        <button onClick={downloadPDF}>Télécharger l'ordonnance</button>
      </div>
    </div>
  );
}

export default Ordonnance;
