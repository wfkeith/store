const express = require("express");
const router = express.Router();
const goodsCtrl = require("../controller/goods");
const operateCtrl = require("../controller/operate");
const multer = require("multer");
const upload = multer({ dest: "/usr/share/nginx/img" });
// const upload = multer({ dest: "E:\\web\\img" });

router
  .route("/goods")
  .get(operateCtrl.authority, goodsCtrl.getGoods)
  .post(operateCtrl.authority, upload.single("img"), goodsCtrl.addGoods)
  .put(operateCtrl.authority, upload.single("img"), goodsCtrl.updateGoods)
  .delete(operateCtrl.authority, goodsCtrl.delGoods);

router.route("/goods/info").get(operateCtrl.authority, goodsCtrl.getInfo);

module.exports = router;
