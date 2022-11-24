const express = require("express"); 
const upload = require('../../middlewares/upload.file');
const router = express.Router();

const {getAllPets, postNewPets,putPets} = require("../controllers/pets.controllers");

router.get("/", getAllPets);
router.post("/",upload.fields([{name:'photo', maxCount: 1}]), postNewPets);
router.put("/:id,",upload.fields([{name:'photo', maxCount: 1}]),putPets)




module.exports = router;