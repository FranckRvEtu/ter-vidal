// CommentairesSection.js
import React, { useState } from 'react';
import mic from '../../Assets/microphone-black-shape.png'; // Assure-toi que le chemin vers l'icône est correct

function CommentairesSection() {
  const [isListening, setIsListening] = useState(false); // État pour suivre si la reconnaissance vocale est activée

  // Fonction pour démarrer ou arrêter l'écoute vocale
  const toggleListening = () => {
      if (isListening) {
          window.annyang.abort(); // Arrête l'écoute
      } else {
          window.annyang.start(); // Commence l'écoute
      }
      setIsListening(!isListening);
  };

  return (
    <div className="commentaires-section">
      <label>Commentaires:</label>
      <textarea placeholder="Commentaires..."></textarea>
      <button onClick={toggleListening}>
        {isListening ? (
          <img src={mic} alt="Arrêter d'écouter" /> // Icône pour "Arrêter d'écouter"
        ) : (
          <img src={mic} alt="Commencer à écouter" /> // Icône pour "Commencer à écouter"
        )}
      </button>
    </div>
  );
}

export default CommentairesSection;
