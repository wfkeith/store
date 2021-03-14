const express = require("express");
const router = express.Router();
const path = require("path");

// 图片文件
router.get("/public/img/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, `../${req.url}`));
});
module.exports = router;
