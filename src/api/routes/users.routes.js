const express = require("express");
const {register, login, logout,getAllUsers} = require("../controllers/users.controllers");
const router = express.Router();
const {isAuth} = require('../../middlewares/auth');

router.get("/register",getAllUsers)
router.post("/register", register)
router.post("/login", login)
router.post('/logout', logout)

module.exports = router;