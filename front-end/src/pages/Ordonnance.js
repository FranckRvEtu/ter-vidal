// Ordonnance.js
import React from 'react';

import '../Style/Ordonnance.css';
import MedicamentSection from '../Components/Ordonnance/MedicamentSection';
import ContreIndicationsSection from '../Components/Ordonnance/ContreIndicationsSection';
import CommentairesSection from '../Components/Ordonnance/CommentairesSection';

function Ordonnance() {
  return (
    <div className="ordonnance">
      <h2>Nom patient Concerné</h2>
      <div className="ordonnance-form">
        <MedicamentSection />
        <ContreIndicationsSection />
        <CommentairesSection />
        <button className="valider-ordonnance">Valider l'ordonnance</button>
      </div>
    </div>
  );
}

export default Ordonnance;
