const express = require("express"); 
const upload = require('../../middlewares/upload.file');
const router = express.Router();

const {getAllPets,getPetsByID, postNewPets,putPets} = require("../controllers/pets.controllers");

router.get("/", getAllPets);
router.get("/:id", getPetsByID);
router.post("/",upload.fields([{name:'photo', maxCount: 1}]), postNewPets);
router.put("/:id",upload.fields([{name:'photo', maxCount: 1}]),putPets)




module.exports = router;