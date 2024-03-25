import React from 'react';
import { useEffect, useState } from 'react';
import '../Style/Ordonnance.css'; // Assure-toi d'avoir un fichier CSS pour les styles spécifiques à Ordonnance
import mic from '../Assets/microphone-black-shape.png';
var ligne ="medicament"

function Ordonnance() {

  const [isListening, setIsListening] = useState(false); // État pour suivre si la reconnaissance vocale est activée
  window.annyang.setLanguage('fr-FR');

  useEffect(() => {
      if (window.annyang) {
          // Définition des commandes vocales
          var commands = {
              
            'médicament *text': function(text) {
              ligne="medicament";
              document.getElementById(ligne).value = document.getElementById(ligne).value + text;
            },
            'posologie *text': function(text) {
              ligne="posologie";
              document.getElementById(ligne).value = document.getElementById(ligne).value + text;
            },
            'commentaire *text': function(text) {
              ligne="commentaire";
              document.getElementById(ligne).value = document.getElementById(ligne).value + text;
            },
            'valider ajout': function(text) {
              const bouton = document.getElementById("ajout-ordo");
              bouton.click();
            },
          };

          // Ajout des commandes vocales à Annyang
          window.annyang.addCommands(commands);
      }
  }, []);

  // Fonction pour démarrer ou arrêter l'écoute vocale
  const toggleListening2 = () => {
      if (isListening) {
          window.annyang.abort();
      } else {
          window.annyang.start();
      }
      setIsListening(!isListening);
  };
  // Logique du composant, par exemple pour gérer les états des formulaires

  return (
    <div className="ordonnance">
      <h2>Nom patient Concerné</h2>
      <div className="ordonnance-form">
        <div className="medicament-section">
          <label>Ajouter un médicament:</label>
          <input id="medicament" type="text" placeholder="Médicament..." />
          <input id="posologie" type="text" placeholder="Posologie..." />
          <button>AJOUTER</button>
          <a className={`mic2 ${isListening ? 'active' : ''}`} onClick={toggleListening2}>{/* Utilisez la foncion pour démarrer ou arrêter l'écoute vocale */}
                    <img src={mic}/>
          </a>
        </div>
        <div className="contreindications-section">
          <label>Contre-indications détectées:</label>
          {/* Mettre ici la logique pour afficher les contre-indications */}
        </div>
        <div className="commentaires-section">
          <label>Commentaires:</label>
          <textarea id="commentaire" placeholder="Commentaires..."></textarea>
        </div>
        <button id="ajout-ordo" className="valider-ordonnance">Valider l'ordonnance</button>
      </div>
    </div>
  );
}

export default Ordonnance;
