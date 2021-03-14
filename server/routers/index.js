const express = require("express");
const router = express.Router();
const goodRouters = require("./goods");
const userRouters = require("./user");
const fileRouters = require("./file");

router.use('/api',[goodRouters, userRouters, fileRouters]);

module.exports = router;
