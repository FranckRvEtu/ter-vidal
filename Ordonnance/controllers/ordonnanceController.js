const Ordonnance = require("../models/ordonnanceModel.js"); // Ajustez le chemin selon votre structure de projet
const express = require("express");
const app = express();
app.use(express.json());

const axios = require("axios");

const addOrdonnance = async (req, res) => {
  const { date, idPatient, prescriptions } = req.body;

  try {
    // Save the new ordonnance
    const newOrdonnance = new Ordonnance({
      date,
      idPatient,
      Prescription: prescriptions || [],
    });
    await newOrdonnance.save();

    // Construct the patient service endpoint URL
    const patientServiceUrl = `http://localhost:11000/patients/${idPatient}/ordonnances`;

    // Update the patient's ordonnance list via patient service
    const response = await axios.post(patientServiceUrl, {
      ordonnanceId: newOrdonnance._id,
    });

    // Handle patient service response
    if (response.status === 200) {
      res.status(201).json({ id: newOrdonnance._id });
    } else {
      console.error("Error updating patient:", response.data);
      res.status(response.status).json({ message: response.data.message });
    }
  } catch (error) {
    console.error("Error adding ordonnance:", error);
    res.status(500).json({ message: "Error creating ordonnance" });
  }
};

const getOrdonnance = async (req, res) => {
  try {
    // Recherche du patient par son ID (remarquez que req.params.id est utilisé ici)
    const { id } = req.params;
    const ordonnance = await Ordonnance.findById(id);

    // Si le patient n'est pas trouvé, renvoyez un code 404
    if (!ordonnance) {
      console.log("error");
    }

    // Si le patient est trouvé, console.log l'ordonnance
    console.log(ordonnance);
    res.status(201).json(ordonnance);
  } catch (error) {
    console.error(error);
  }
};

const getAllOrdonnances = async (req, res) => {
  try {
    const ordonnances = await Ordonnance.find({});
    res.json(ordonnances);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des ordonnances" });
  }
};

const updateOrdonnance = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const ordonnance = await Ordonnance.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!ordonnance) {
      console.log("Ordonnance pas trouvé");
      res.status(404).json({ message: "Ordonnance not found" });
      return;
    }

    res.json(ordonnance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the Ordonnance" });
  }
};

const deleteOrdonnance = async (req, res) => {
  try {
    const { id } = req.params;
    const ordonnance = await Ordonnance.findByIdAndDelete(id);
    if (!ordonnance) {
      return res.status(404).json({ message: "Ordonnance pas trouvé" });
    }
    res.status(204).json({ message: "Ordonnance supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'ordonnance" });
  }
};

module.exports = {
  getOrdonnance,
  addOrdonnance,
  deleteOrdonnance,
  getAllOrdonnances,
  updateOrdonnance,
};
