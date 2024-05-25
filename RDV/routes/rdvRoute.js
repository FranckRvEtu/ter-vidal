const express = require("express");
const {
  addRDV,
  getRDV,
  deleteRDV,
  updateRDV,
  getWeekRDV,
  getUpcomingRDVs,
} = require("../controllers/RdvController.js");
const router = express.Router();

router.post("/addRDV", addRDV);
router.get("/getRDV/:id", getRDV);
router.get("/deleteRDV/:id", deleteRDV);
router.post("/updateRDV/:id", updateRDV);
router.get("/getRDVs", getWeekRDV);
router.get("/getUpcomingRDVs", getUpcomingRDVs);
router.get('/getWeekRDV',getWeekRDV);

module.exports = router;
