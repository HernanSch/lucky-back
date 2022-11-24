const express = require("express");
const {register, login, logout,getAllUsers} = require("../controllers/users.controllers");
const router = express.Router();
const {isAuth} = require('../../middlewares/auth');

router.get("/user",getAllUsers)
router.post("/register", register)
router.post("/login", login)
router.post('/logout',[isAuth], logout)

module.exports = router;