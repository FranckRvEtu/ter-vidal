import React from "react";
import "../Style/Header.css"; // Assure-toi que ce fichier contient les styles nécessaires
import profil from "../Assets/profil.png"; // Assure-toi que le chemin est correct

function Header() {
  return (
    <div className="header">
      <h1>Nom Apps</h1>
      <img id="img_profil" src={profil} alt="Profil" />
      <h3 id="profil-name">Dr Kawasaki</h3>
    </div>
  );
}

export default Header;
