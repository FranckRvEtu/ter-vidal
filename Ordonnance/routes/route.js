
const express = require("express");
const {getOrdonnance} = require("../controllers/OrdonnanceController");

const router = express.Router();

module.exports = router

router.post("/list_ordos", getOrdonnances);

module.exports = router;