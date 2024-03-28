const express = require("express");
const {addAntecedant, deleteAntecedant,getAntecedant,getAllAntecedant}  = require("../controllers/antecedantController");
const router = express.Router();

router.post('/addAntecedant',addAntecedant);
router.get('/deleteAntecedant/:id',deleteAntecedant);
router.get('/getAntecedant/:id',getAntecedant);
router.get('/allAntecedants',getAllAntecedant);

module.exports = router;
