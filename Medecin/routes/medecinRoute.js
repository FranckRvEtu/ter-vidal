const express = require("express");
const {loginMedecin, addMedecin, getMedecin, updateMedecin, deleteMedecin}  = require("../controllers/medecinController");
const {refreshMedecin}  = require("../controllers/refreshTokenController");
const {logoutMedecin}  = require("../controllers/logoutController");
const router = express.Router();
const verifyJWT = require('../../front-end/middleWare/verifyJWT');
const app = express();

router.get('/refreshMedecin',refreshMedecin);
router.post('/loginMedecin',loginMedecin);

app.use(verifyJWT);

router.get('/logoutMedecin',logoutMedecin);
router.get('/addMedecin',addMedecin);
router.get('/getMedecin/:id',getMedecin);
router.get('/updateMedecin/:id',updateMedecin);
router.get('/deleteMedecin/:id',deleteMedecin);

module.exports = router;