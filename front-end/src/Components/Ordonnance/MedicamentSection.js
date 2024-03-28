import React, { useEffect, useState } from 'react';
import mic from '../../Assets/microphone-black-shape.png'; // Importer l'icône du microphone


function MedicamentSection({ onAjouter }) {
    const [medicament, setMedicament] = useState('');
    const [posologie, setPosologie] = useState('');
    const [commentaire, setCommentaire] = useState('');
  
    const handleAjouterClick = () => {
        if (medicament && posologie) {
      onAjouter({ medicament, posologie,commentaire });
      setMedicament('');
      setPosologie('');
      setCommentaire('');
    }};
  
    return (
      <div className="medicament-section">
        <input
          type="text"
          placeholder="Médicament..."
          value={medicament}
          onChange={(e) => setMedicament(e.target.value)}
        />
        <input
          type="text"
          placeholder="Posologie..."
          value={posologie}
          onChange={(e) => setPosologie(e.target.value)}
        />
        <textarea // Ajout d'un champ de texte pour les commentaires
        placeholder="Commentaire..."
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
      ></textarea>
        <button onClick={handleAjouterClick}>AJOUTER</button>
      </div>
    );
  }
  

export default MedicamentSection;
