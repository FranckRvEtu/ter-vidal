import React, { useState } from 'react';
import mic from '../../Assets/microphone-black-shape.png';

function CommentairesSection({ onCommentaireChange }) {
  const [isListening, setIsListening] = useState(false); 

  // Fonction pour démarrer ou arrêter l'écoute vocale
  const toggleListening = () => {
      if (isListening) {
          window.annyang.abort(); // Arrête l'écoute
      } else {
          window.annyang.start(); // Commence l'écoute
      }
      setIsListening(!isListening);
  };

  const [commentaire, setCommentaire] = useState('');

  const handleCommentaireChange = (e) => {
    setCommentaire(e.target.value);
    onCommentaireChange(e.target.value);
  };

  return (
    <div className="commentaires-section">
      <label>Commentaires:</label>
      <textarea
        placeholder="Commentaires..."
        value={commentaire}
        onChange={handleCommentaireChange}
      ></textarea>
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
