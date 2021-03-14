const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const addUser = (req, res) => {
  const params = req.body;
  const user = new UserModel({
    account: params.account,
    password: bcrypt.hashSync(params.password, 10),
  });

  user
    .save()
    .then((data) => {
      console.log(data);
      res.send({
        code: 0,
        message: "添加成功",
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.send({
        code: -1,
        message: "添加失败",
      });
    });
};

const getUser = (req, res) => {
  account = new RegExp(req.query.account);
  UserModel.find({ account: account }, { account: 1, _id: 0, password: 1 })
    .then((data) => {
      res.send({
        code: 0,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
        code: -1,
        message: "查询失败",
      });
    });
};

// 修改密码
const updateUser = (req, res) => {
  try {
    let userData = jwt.verify(req.headers.authorization, config.secrect);
    UserModel.findOne({ account: userData.account }, { password: 1 })
      .then((userInfo) => {
        if (bcrypt.compareSync(req.body.oldPassword, userInfo.password)) {
          UserModel.updateOne(
            { account: userData.account },
            { $set: { password: bcrypt.hashSync(req.body.password, 10) } }
          )
            .then((data) => {
              console.log(data);
              res.send({
                code: 0,
                message: "修改成功",
              });
            })
            .catch((err) => {
              console.log(err.message);
              res.send({
                code: -1,
                message: "修改失败",
              });
            });
        } else {
          res.send({
            code: -1,
            message: "原密码不正确",
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
        res.send({
          code: -1,
          message: "查询失败",
        });
      });
  } catch (err) {
    console.log(err.message);
    res.status(401);
    res.send({
      code: -1,
      message: "token无效",
    });
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
};
