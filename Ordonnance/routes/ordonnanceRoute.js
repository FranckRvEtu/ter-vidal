const express = require("express");
const {addOrdonnance, deleteOrdonnance, getOrdonnance, getAllOrdonnances, updateOrdonnance}  = require("../controllers/ordonnanceController");
const router = express.Router();

router.post('/addOrdonnance',addOrdonnance);
router.delete('/deleteOrdonnance/:id',deleteOrdonnance);
router.get('/getOrdonnance/:id',getOrdonnance);
router.get('/allOrdonnances',getAllOrdonnances);
router.put('/updateOrdonnance/:id',updateOrdonnance);

module.exports = router;