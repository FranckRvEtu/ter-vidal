import React, { useEffect, useState } from 'react';
import mic from '../../Assets/microphone-black-shape.png'; // Importer l'icône du microphone


function MedicamentSection({ onAjouter }) {
    const [medicament, setMedicament] = useState('');
    const [posologie, setPosologie] = useState('');
  
    const handleAjouterClick = () => {
        if (medicament && posologie) {
      onAjouter({ medicament, posologie });
      setMedicament('');
      setPosologie('');
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
        <button onClick={handleAjouterClick}>AJOUTER</button>
      </div>
    );
  }
  

export default MedicamentSection;
