const express = require("express");
const {addPrescription, deletePrescription,getPrescription,getAllPrescriptions}  = require("../controllers/prescriptionController");
const router = express.Router();

router.post('/addPrescription',addPrescription);
router.get('/deletePrescription/:id',deletePrescription);
router.get('/getPrescription/:id',getPrescription);
router.get('/allPrescriptions',getAllPrescriptions);

module.exports = router;