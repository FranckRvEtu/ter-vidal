import React, { useState, useEffect } from "react";
import "../Style/Ordonnance.css";
import mic from "../../public/Assets/microBlack.jpg";
import io from "socket.io-client";

function Ordonnance() {
  const [isListening, setIsListening] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  useEffect(() => {
    const socket = io("http://192.168.1.32:5000");

    socket.on("transcribedText", (text) => {
      console.log(text);

      if (/(médicament|médicaments|Médicament|Médicaments)/gi.test(text)) {
        const modifiedString = text.replace(
          /(médicament|médicaments|Médicament|Médicaments)/gi,
          ""
        );
        console.log("medoc:" + modifiedString);
        document.getElementById("Medicament").value += modifiedString;
      }
    });

    if (window.annyang) {
      window.annyang.setLanguage("fr-FR");
      const commands = {
        "médicament *text": function (text) {
          document.getElementById("Medicament").value += text;
        },
        "posologie *text": function (text) {
          document.getElementById("Posologie").value += text;
        },
        "commentaire *text": function (text) {
          document.getElementById("Remarque").value += text;
        },
        "valider ajout": function () {
          const form = document.getElementById("ordonnance-form");
          form.dispatchEvent(new Event("submit", { cancelable: true }));
        },
      };
      window.annyang.addCommands(commands);
    }
  }, []);

  const toggleListening2 = () => {
    if (isListening) {
      window.annyang.abort();
    } else {
      window.annyang.start();
    }
    setIsListening(!isListening);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3013/addPrescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Medicament: event.target.Medicament.value,
          Posologie: event.target.Posologie.value,
          Remarque: event.target.Remarque.value,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setPrescriptions([...prescriptions, data]);
        event.target.reset();
      } else {
        console.error("Failed to add prescription");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateOrdo = async () => {
    try {
      const response = await fetch(
        "http://localhost:3014/ordonnance/addOrdonnance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: new Date(),
            idPatient: "60d6b2e4d0a3e4c4d0c7a7b7",
            prescriptions: prescriptions,
          }),
        }
      );
      if (response.ok) {
        // Mettez ici le code à exécuter si la requête réussit
        console.log("Ordonnance créée avec succès");
      } else {
        console.error("Failed to create ordonnance");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="ordonnance">
      <h2>Nom patient Concerné</h2>
      <form
        id="ordonnance-form"
        className="ordonnance-form"
        onSubmit={handleSubmit}
      >
        <div className="medicament-section">
          <label>Ajouter un médicament:</label>
          <input
            id="Medicament"
            name="Medicament"
            type="text"
            placeholder="Médicament..."
          />
          <input
            id="Posologie"
            name="Posologie"
            type="text"
            placeholder="Posologie..."
          />
        </div>
        <div className="commentaires-section">
          <label>Commentaires:</label>
          <textarea
            id="Remarque"
            name="Remarque"
            placeholder="Commentaires..."
          ></textarea>
        </div>
        <div className="contreindications-section">
          <label>Contre-indications détectées:</label>
        </div>
        <div className="prescriptions-buttons">
          <button id="ajout-ordo" type="submit">
            AJOUTER
          </button>
          <a
            className={`mic2 ${isListening ? "active" : ""}`}
            onClick={toggleListening2}
          >
            <img src={mic} alt="Activer l'écoute" />
          </a>
        </div>
      </form>
      <button id="ajout-ordo" onClick={handleCreateOrdo}>
        créer ordo
      </button>

      {prescriptions.length > 0 && (
        <div className="prescription-list">
          <h3>Prescriptions ajoutées :</h3>
          {prescriptions.map((prescription, index) => (
            <div key={index} className="prescription-item">
              <p>Médicament : {prescription.Medicament}</p>
              <p>Posologie : {prescription.Posologie}</p>
              <p>Remarque : {prescription.Remarque}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ordonnance;
