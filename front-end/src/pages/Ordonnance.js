import React from 'react';
import '../Style/Ordonnance.css'; // Assure-toi d'avoir un fichier CSS pour les styles spécifiques à Ordonnance

function Ordonnance() {
  // Logique du composant, par exemple pour gérer les états des formulaires

  return (
    <div className="ordonnance">
      <h2>Nom patient Concerné</h2>
      <div className="ordonnance-form">
        <div className="medicament-section">
          <label>Ajouter un médicament:</label>
          <input type="text" placeholder="Médicament..." />
          <input type="text" placeholder="Posologie..." />
          <button>AJOUTER</button>
        </div>
        <div className="contreindications-section">
          <label>Contre-indications détectées:</label>
          {/* Mettre ici la logique pour afficher les contre-indications */}
        </div>
        <div className="commentaires-section">
          <label>Commentaires:</label>
          <textarea placeholder="Commentaires..."></textarea>
        </div>
        <button className="valider-ordonnance">Valider l'ordonnance</button>
      </div>
    </div>
  );
}

export default Ordonnance;
