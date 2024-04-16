const Patient = require("../models/patientModel.js");

// cette fonction verifie pas si le patient existe déjà
const addPatient = async (req, res) => {
  // on prend les infos de req.body et on les stock
  console.log(req.body.patient);
  const {
    name,
    firstname,
    birthdate,
    sexe,
    height,
    weight,
    BloodType,
    antecedants,
    listIDOrdo,
    listIDrdv,
    listIDvisite,
  } = req.body.patient;
  try {
    // Créer le patient dans la base de données
    const newPatient = new Patient({
      // on utilise la méthode save car elle est plus flexible que create
      name,
      firstname,
      birthdate,
      sexe,
      height,
      weight,
      BloodType,
      antecedants: antecedants || [],
      listIDOrdo: listIDOrdo || [],
      listIDrdv: listIDrdv || [],
      listIDvisite: listIDvisite || [],
    });

    await newPatient.save();

    res.status(201).json({ id: newPatient.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du patient" });
  }
};

const getPatient = async (req, res) => {
  try {
    // Recherche du patient par son ID (remarquez que req.params.id est utilisé ici)
    const { id } = req.params;
    const patient = await Patient.findById(id);

    // Si le patient n'est pas trouvé, renvoyez un code 404
    if (!patient) {
      return res.status(404).json({ message: "Patient pas trouvé" });
    }

    // Si le patient est trouvé, renvoyez les données du patient
    console.log(patient);
    res.json(patient);
  } catch (error) {
    console.error(error);
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des patients" });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Validation logic here (if needed)
  // Example: if (!updates.name) return res.status(400).json({message: "Name is required"});

  try {
    // Using $set to explicitly control which fields to update
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating patient" });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient pas trouvé" });
    }
    res.status(204).json({ message: "Patient supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du patient" });
  }
};

module.exports = {
  getPatient,
  addPatient,
  deletePatient,
  getAllPatients,
  updatePatient,
  // Ajoutez les a
};
