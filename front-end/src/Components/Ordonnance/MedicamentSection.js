import React, { useEffect, useState } from 'react';
import mic from '../../Assets/microphone-black-shape.png'; // Importer l'icône du microphone

function MedicamentSection() {

    const [isListening, setIsListening] = useState(false); // État pour suivre si la reconnaissance vocale est activée

    useEffect(() => {
        if (window.annyang) {
            // Définition des commandes vocales
            var commands = {
                'dashboard': () => console.log('Dashboard clicked'),
                'calendar': () => console.log('Calendar clicked'),
                'patients': () => console.log('Patients clicked'),
                'test': () => alert('test'),
                // Ajoutez d'autres commandes vocales ici
            };

            // Ajout des commandes vocales à Annyang
            window.annyang.addCommands(commands);
        }
    }, []);

    // Fonction pour démarrer ou arrêter l'écoute vocale
    const toggleListening = () => {
        if (isListening) {
            window.annyang.abort();
        } else {
            window.annyang.start();
        }
        setIsListening(!isListening);
    };



    return (
        <div className="medicament-section">
          <label>Ajouter un médicament:</label>
          <input type="text" placeholder="Médicament..." />
          <input type="text" placeholder="Posologie..." />
          <button onClick={toggleListening}>
            {isListening ? (
              <img src={mic} alt="Arrêter d'écouter" /> // Icône pour "en écoute"
            ) : (
              <img src={mic} alt="Commencer à écouter" /> // Même icône ou différente si tu veux changer l'apparence quand il n'écoute pas
            )}
          </button>
          <button>AJOUTER</button>
        </div>
      );
}

export default MedicamentSection;
