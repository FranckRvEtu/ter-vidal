const express = require("express");
const {addOrdonnance, deleteOrdonnance,getOrdonnance,getAllOrdonnances}  = require("../controllers/ordonnanceController");
const router = express.Router();

router.post('/addOrdonnance',addOrdonnance);
router.get('/deleteOrdonnance/:id',deleteOrdonnance);
router.get('/getOrdonnance/:id',getOrdonnance);
router.get('/allOrdonnances',getAllOrdonnances);

module.exports = router;