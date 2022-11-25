const express = require("express");
const {register, login, logout,getAllUsers} = require("../controllers/users.controllers");
const router = express.Router();
const {isAuth} = require('../../middlewares/auth');
const upload = require('../../middlewares/upload.file');

router.get("/user",getAllUsers)
router.post("/register",upload.fields([{name:'photo', maxCount: 1}]), register)
router.post("/login", login)
router.post('/logout',[isAuth], logout)

module.exports = router;