const express = require("express");
const {
  addRDV,
  getRDV,
  deleteRDV,
  updateRDV,
  getAllRDVs,
  getUpcomingRDVs,
  deleteRDVFromPatient,
} = require("../controllers/RdvController.js");
const router = express.Router();

router.post("/addRDV", addRDV);
router.get("/getRDV/:id", getRDV);
router.get("/deleteRDV/:id", deleteRDV);
router.post("/updateRDV/:id", updateRDV);
router.get("/getRDVs", getAllRDVs);
router.get("/getUpcomingRDVs", getUpcomingRDVs);
router.get("/deleteRDVFromPatient/:idPatient", deleteRDVFromPatient);

//router.get('/getWeekRDV',getWeekRDV);

module.exports = router;
