const express = require('express');
const {addVisite, deleteVisite,getVisite,getAllVisites}  = require("../controllers/visiteController");
const router = express.Router();

router.post('/addVisite',addVisite);
router.get('/deleteVisite/:id',deleteVisite);
router.get('/getVisite/:id',getVisite);
router.get('/allVisites',getAllVisites);

module.exports = router;