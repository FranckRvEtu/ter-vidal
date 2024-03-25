// Ordonnance.js
import React, { useState } from 'react';

import '../Style/Ordonnance.css';
import MedicamentSection from '../Components/Ordonnance/MedicamentSection';
import ContreIndicationsSection from '../Components/Ordonnance/ContreIndicationsSection';
import CommentairesSection from '../Components/Ordonnance/CommentairesSection';

function Ordonnance() {
  const [medicaments, setMedicaments] = useState([]);
  const [commentaire, setCommentaire] = useState('');

  const ajouterMedicament = (medicament) => {
    setMedicaments([...medicaments, medicament]);
  };

  const handleCommentaireChange = (nouveauCommentaire) => {
    setCommentaire(nouveauCommentaire);
  };

  const validerOrdonnance = () => {
    console.log("Médicaments:", medicaments);
    console.log("Commentaire:", commentaire);
  };


  return (
    <div className="ordonnance">
      <h2>Nom patient Concerné</h2>
      <div className="ordonnance-form">
        <MedicamentSection onAjouter={ajouterMedicament} />
        <ContreIndicationsSection />
        <CommentairesSection onCommentaireChange={handleCommentaireChange} />
        <button className="valider-ordonnance" onClick={validerOrdonnance}>Valider l'ordonnance</button>
        </div>
      
        <div>
          {medicaments.map((med, index) => (
            <div key={index}>
              <p>Médicament: {med.medicament}, Posologie: {med.posologie}</p>
            </div>
          ))}
        </div>
            
              <button className='listemed' onClick={() => console.log(medicaments)}>
                Afficher la liste des médicaments
              </button>
                
    </div>
  );
}

export default Ordonnance;
