const express = require("express");
const dashboard = require("../controllers/dashboardController");

const router = express.Router();

router.get("/dashboard/:id", (req, res) => dashboard(req, res));

module.exports = router;
