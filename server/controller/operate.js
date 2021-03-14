const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const UserModel = require("../models/user");

const login = (req, res) => {
  UserModel.findOne({ account: req.body.account })
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(
          {
            account: req.body.account,
            exp: parseInt(Date.now() / 1000) + 60 * 60 * 24, // 登录令牌失效时间
          },
          config.secrect
        );
        res.send({
          code: 0,
          message: "登录成功",
          token: token,
        });
      } else {
        res.send({
          code: -1,
          message: "密码错误",
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.send({
        code: -1,
        message: "查询失败",
      });
    });
};

const authority = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, config.secrect);
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401);
    res.send({ code: -1, message: "token无效" });
  }
};

module.exports = {
  login,
  authority,
};
