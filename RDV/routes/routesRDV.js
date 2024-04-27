const express = require("express");
const {addRDV, deleteRDV,getRDV,getweekRDV}  = require("../controllers/RDVController");
const router = express.Router();

router.post('/addRDV',addRDV);
router.get('/deleteRDV/:id',deleteRDV);
router.get('/getRDV/:id',getRDV);
router.get('/allWeekRDV',getweekRDV);

module.exports = router;