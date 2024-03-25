const express = require("express");
const {addOrdonnance}  = require("../controllers/OrdonnanceController");
const router = express.router();

router.post('/addOrdonnance',addOrdonnance);

module.exports = router;