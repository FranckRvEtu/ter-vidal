const express = require("express");
const {addPatient, deletePatient,getPatient,getAllPatients}  = require("../controllers/patientController");
const router = express.Router();

router.post('/addPatient',addPatient);
router.get('/deletePatient/:id',deletePatient);
router.get('/getPatient/:id',getPatient);
router.get('/allPatients',getAllPatients);

module.exports = router;