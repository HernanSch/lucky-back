const express = require("express"); 

const router = express.Router ();


const {getAllAnimalProtector, postNewAnimalProtector,putAnimalProtector} = require("../controllers/animalProtector.controllers");

router.get("/", getAllAnimalProtector);
router.post("/", postNewAnimalProtector);
router.put("/:id",putAnimalProtector)




module.exports = router;