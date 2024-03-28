import React, { useEffect, useState } from 'react';
import annyang from 'annyang';
import '../Style/connection.css';

function Connection() {
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (annyang) {
            annyang.setLanguage('fr-FR');

            if (isListening) {
                annyang.start();
            } else {
                annyang.abort();
            }

            // Ajoutez un callback de résultat seulement une fois lors de l'initialisation
            annyang.addCallback('result', handleResult);

            return () => {
                // Nettoyez le callback lors du démontage du composant
                annyang.removeCallback('result', handleResult);
            };
        }
    }, [isListening]);

    const handleResult = (phrases) => {
        if (isListening) {
            const transcribedText = phrases[0];
            sendTranscribedText(transcribedText);
        }
    };

    const handleConnectionButtonClick = () => {
        setIsListening(!isListening);
    };

    const sendTranscribedText = (transcribedText) => {
        fetch('http://192.168.1.44:5000/send-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: transcribedText })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Texte transcrit envoyé avec succès:', transcribedText);
                } else {
                    console.error('Erreur lors de l\'envoi du texte transcrit.');
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du texte transcrit:', error);
            });
    };

    return (
        <div className="div-button">
            <button id="button-connection" onClick={handleConnectionButtonClick}>
                {isListening ? "Stop" : "Ecoute"}
            </button>
        </div>
    );
}

export default Connection;
