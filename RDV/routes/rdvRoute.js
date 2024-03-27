const express = require("express");
const {addRDV, getRDV,deleteRDV,updateRDV, getAllRDVs}  = require("../controllers/RdvController.js");
const router = express.Router();

router.post('/addRDV',addRDV);
router.get('/getRDV/:id',getRDV);
router.get('/deleteRDV/:id',deleteRDV);
router.get('/allRDVs',getAllRDVs);

module.exports = router;