const express = require("express"); 

const router = express.Router();

const {getAllPets, postNewPets,putPets} = require("../controllers/pets.controllers");



router.get("/", getAllPets);
router.post("/", postNewPets);
router.put("/:id,",putPets)




module.exports = router;