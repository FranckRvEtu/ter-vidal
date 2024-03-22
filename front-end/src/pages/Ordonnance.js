import React, { useState } from 'react';
//import './Ordonnance.css'; // Assurez-vous d'avoir un fichier CSS avec les styles nécessaires

function Ordonnance() {
  const [medicament, setMedicament] = useState('');
  const [posologie, setPosologie] = useState('');
  const [commentaires, setCommentaires] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique pour traiter les données du formulaire...
    console.log(medicament, posologie, commentaires);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NomApp</h1>
        {/* Ajoutez votre barre de navigation ou votre menu ici */}
      </header>
      <main>
        <aside>
          {/* Barre latérale avec navigation */}
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Calendar</li>
              <li>Patients</li>
              {/* autres éléments de navigation */}
            </ul>
          </nav>
        </aside>
        <section>
          <h2>Nom patient Concerné</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Ajouter un médicament:
              <input
                type="text"
                value={medicament}
                onChange={(e) => setMedicament(e.target.value)}
                placeholder="Médicament..."
              />
            </label>
            <label>
              Posologie:
              <input
                type="text"
                value={posologie}
                onChange={(e) => setPosologie(e.target.value)}
                placeholder="Posologie..."
              />
            </label>
            <button type="submit">AJOUTER</button>
          </form>
          <div>
            <h3>Contreindications détectées:</h3>
            {/* Contreindications iraient ici */}
          </div>
          <div>
            <label>
              Commentaires:
              <textarea
                value={commentaires}
                onChange={(e) => setCommentaires(e.target.value)}
              />
            </label>
          </div>
          <button onClick={() => console.log('Validation...')}>Valider l'ordonnance</button>
        </section>
        <aside>
          <h3>Aperçu</h3>
          {/* L'aperçu de l'ordonnance irait ici */}
        </aside>
      </main>
    </div>
  );
}

export default Ordonnance;
