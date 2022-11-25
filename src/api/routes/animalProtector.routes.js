const express = require("express"); 
const upload = require('../../middlewares/upload.file');
const router = express.Router();




const {getAllAnimalProtector, postNewAnimalProtector,putAnimalProtector,registerProtector,loginProtector,logoutProtector} = require("../controllers/animalProtector.controllers");

router.get("/", getAllAnimalProtector);
router.post("/",upload.fields([{name:'photo', maxCount: 1}]), postNewAnimalProtector);
router.put("/:id",upload.fields([{name:'photo', maxCount: 1}]),putAnimalProtector)
router.post("/registerProtector", registerProtector)
router.post("/loginProtector", loginProtector)
router.post('/logoutProtector', logoutProtector)

module.exports = router;