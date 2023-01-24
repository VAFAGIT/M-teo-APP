const express = require("express");
const router = express();
const { CreateUser, Login } = require("../controllers/AuthController");

router.post("/", Login);
router.post("/register", CreateUser);


module.exports = { router} ;

