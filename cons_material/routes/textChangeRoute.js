const express = require("express");
const router = express.Router();
const textChange = require("../controllers/textChangeController");

router.post("/textchange", async (req, res) => textChange(req,res));

module.exports = router;
