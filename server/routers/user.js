const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user");
const operateCtrl = require("../controller/operate");

router
  .route("/user")
  .post(userCtrl.addUser)
  .get(userCtrl.getUser)
  .put(userCtrl.updateUser);

// 登录
router.post("/login", operateCtrl.login);

module.exports = router;
