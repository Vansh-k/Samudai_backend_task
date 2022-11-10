const express = require("express");
const signup = require("../controllers/signupController");

const router = express.Router();

router.post("/signup", (req, res) => signup(req, res));

module.exports = router;