const express = require("express");
const router = express.Router();
const accessChange = require("../controllers/accessChangeController");

router.post("/change", async (req, res) => accessChange(req,res));

module.exports = router;
