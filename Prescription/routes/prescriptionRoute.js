const express = require("express");
const {
  addPrescription,
  addManyPrescriptions,
  deletePrescription,
  getPrescription,
  getAllPrescriptions,
  countPrescriptionsByMedication,
  countPrescriptionsByDate,
} = require("../controllers/prescriptionController");
const router = express.Router();

router.post("/addPrescription", addPrescription);
router.get("/deletePrescription/:id", deletePrescription);
router.get("/getPrescription/:id", getPrescription);
router.get("/allPrescriptions", getAllPrescriptions);
router.post("/addManyPrescriptions", addManyPrescriptions);
router.get("/countPrescriptionsByMedication", countPrescriptionsByMedication);
router.get("/countPrescriptionsByDate", countPrescriptionsByDate);

module.exports = router;
