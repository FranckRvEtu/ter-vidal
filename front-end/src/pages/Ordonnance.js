// Ordonnance.js
import React, { useState } from "react";

import "../Style/Ordonnance.css";
import MedicamentSection from "../Components/Ordonnance/MedicamentSection";
import ContreIndicationsSection from "../Components/Ordonnance/ContreIndicationsSection";

function Ordonnance() {
  const [medicaments, setMedicaments] = useState([]);

  const ajouterMedicament = (medicament) => {
    setMedicaments([...medicaments, medicament]);
  };

  const supprimerMedicament = (index) => {
    const nouvelleListe = medicaments.filter((_, i) => i !== index);
    setMedicaments(nouvelleListe);
  };

  const validerOrdonnance = () => {
    console.log("Médicaments:", medicaments);
  };

  return (
    <div className="ordonnance">
      <h2>Nom patient Concerné</h2>

      <div className="ordonnance-form">
        <MedicamentSection onAjouter={ajouterMedicament} />
        <ContreIndicationsSection />
        <button className="valider-ordonnance" onClick={validerOrdonnance}>
          Valider l'ordonnance
        </button>
      </div>

      <div>
        {medicaments.map((med, index) => (
          <div key={index}>
            <p>
              Médicament: {med.medicament}, Posologie: {med.posologie},
              Commentaire: {med.commentaire}
            </p>
            <button onClick={() => supprimerMedicament(index)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <button className="listemed" onClick={() => console.log(medicaments)}>
        Afficher la liste des médicaments
      </button>
    </div>
  );
}

export default Ordonnance;
