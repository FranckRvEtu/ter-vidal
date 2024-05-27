const express = require("express");
const {
  addPatient,
  updatePatient,
  deletePatient,
  getPatient,
  getAllPatients,
  addOrdonnanceToPatient,
} = require("../controllers/patientController");

const router = express.Router();

// Existing routes
router.post("/addPatient", addPatient);
router.post("/updatePatient/:id", updatePatient);
router.get("/deletePatient/:id", deletePatient);
router.get("/getPatient/:id", getPatient);
router.get("/allPatients", getAllPatients);
router.post("/patients/:id/ordonnances", addOrdonnanceToPatient);

module.exports = router;
