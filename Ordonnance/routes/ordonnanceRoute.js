const express = require("express");
const {addOrdonnance}  = require("../controllers/ordonnanceController");
const router = express.Router();

router.post('/addOrdonnance',addOrdonnance);

module.exports = router;