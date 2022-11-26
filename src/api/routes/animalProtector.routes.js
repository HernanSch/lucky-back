const express = require("express"); 
const upload = require('../../middlewares/upload.file');
const router = express.Router();
const {isAuth} = require('../../middlewares/auth');

const {getAllAnimalProtector, postNewAnimalProtector,putAnimalProtector,loginProtector,logoutProtector,getProtectorByID} = require("../controllers/animalProtector.controllers");

router.get("/user", getAllAnimalProtector);
router.get("/user/:id", getProtectorByID);
router.post("/",upload.fields([{name:'photo', maxCount: 1}]), postNewAnimalProtector);
router.put("/:id",upload.fields([{name:'photo', maxCount: 1}]),putAnimalProtector)

router.post("/login", loginProtector)
router.post('/logout',[isAuth], logoutProtector)

module.exports = router;