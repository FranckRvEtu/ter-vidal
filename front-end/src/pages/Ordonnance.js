
// Ordonnance.js

import React from 'react';
import '../Style/Ordonnance.css';
import MedicamentSection from '../Components/Ordonnance/MedicamentSection';
import ContreIndicationsSection from '../Components/Ordonnance/ContreIndicationsSection';
import signature from '../Assets/signature.png';
import rpps from '../Assets/rpps.png';

class Ordonnance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medicaments: [],
    };
  }

  ajouterMedicament = (medicament) => {
    this.setState(prevState => ({
      medicaments: [...prevState.medicaments, medicament],
    }));
  };

  supprimerMedicament = (index) => {
    this.setState(prevState => ({
      medicaments: prevState.medicaments.filter((_, i) => i !== index),
    }));
  };

  validerOrdonnance = () => {
    console.log("Médicaments:", this.state.medicaments);
  };

  render() {
    const { patient } = this.props;
    const { docteur } = this.props;
    const { cabinet } = this.props;
    
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1; // JavaScript months are 0-based counting
    const year = today.getFullYear();

    const formattedDate = `${cabinet.ville}, le ${date} ${month} ${year}`;
    return (
      <div className="ordonnance">
        <div className="ordonnance-form">
          <h2>Nom patient Concerné</h2>
          <div className="ordonnance-form">
            <MedicamentSection onAjouter={this.ajouterMedicament} />
            <ContreIndicationsSection />
            <div className="comment-section">
              <h3>General Comments</h3>
              <textarea placeholder="Add your comments here..." onChange={e => this.setState({ comment: e.target.value })}></textarea>
            </div>
            <button className="valider-ordonnance" onClick={this.validerOrdonnance}>Valider l'ordonnance</button>
          </div>
          <div>
            {this.state.medicaments.map((med, index) => (
              <div key={index}>
                <p>Médicament: {med.medicament}, Posologie: {med.posologie}, Commentaire: {med.commentaire}</p>
                <button onClick={() => this.supprimerMedicament(index)}>Supprimer</button>
              </div>
            ))}
          </div>
          <button className='listemed' onClick={() => console.log(this.state.medicaments)}>
            Afficher la liste des médicaments
          </button>
        </div>
        <div className='pdf-viewer'>
          <h2>Ordonnance</h2>
          <div className='info-docteur'>
            <p>Docteur {docteur.prenom} {docteur.nom}</p>
            <p>{docteur.specialite}</p><hr/>
            <p>{docteur.credentials}</p><hr/>
            <img src={rpps} alt="RPPS" />
          </div>
          <div className='info-cabinet'>
            <p>{cabinet.adresse}</p>
            <p>{cabinet.codePostal} {cabinet.ville}</p><hr/>
            <p>{cabinet.telephone}</p>
            <p>{cabinet.telephoneUrg}</p><hr/>
            <p>{formattedDate}</p>
            <p>{}</p>
          </div>
          <div className='info-patient'>
            <p>{patient.sexe === 'Masculin' ? 'Monsieur' : 'Madame'} {patient.prenom} {patient.nom}</p>
            <p>Age: {patient.age} ans, {patient.weight} kg</p>
          </div>
          <div className='info-medicaments'>
            {this.state.medicaments.map((med, index) => (
              <div key={index}>
                <p>{med.medicament} {med.posologie} {med.commentaire}</p>
              </div>
            ))}
          </div>
          <div className='com-gen'>
            <p>{this.state.comment}</p>
          </div>
          <div className='signature'>
            <p>Signature</p>
            <img src={signature} alt="Doctor's Signature" />
          </div>
          <div className='ordonannce-footer'></div>
        </div>
      </div>
    );
  }
}

export default Ordonnance;