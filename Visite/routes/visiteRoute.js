const express = require("express");
const {
  addVisite,
  deleteVisite,
  getVisite,
  getAllVisites,
  daylyVisiteCount,
} = require("../controllers/visiteController");
const router = express.Router();

router.post("/addVisite", addVisite);
router.get("/deleteVisite/:id", deleteVisite);
router.get("/getVisite/:id", getVisite);
router.get("/allVisites", getAllVisites);
router.get("/daylyVisiteCount", daylyVisiteCount);

module.exports = router;
