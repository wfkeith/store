const path = require("path");
const fs = require("fs");
const goodsModel = require("../models/goods");

// 查询商品
const getGoods = (req, res) => {
  // console.log(req.query);
  let name = new RegExp(req.query.name),
    pageSize = parseInt(req.query.pageSize) || 10,
    pageIndex = parseInt(req.query.pageIndex) || 1,
    id = req.query.id;
  goodsModel
    .find({ name: name })
    .skip(pageSize * (pageIndex - 1))
    .limit(pageSize)
    .then((data) => {
      // console.log(data);
      res.send({
        code: 0,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.send({
        code: -1,
        message: "查询失败",
      });
    });
};

const getInfo = (req, res) => {
  goodsModel
    .findById({ _id: req.query.id })
    .then((data) => {
      console.log(data);
      res.send({
        code: 0,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.send({
        code: -1,
        message: "查找失败",
      });
    });
};

// 新增商品
const addGoods = (req, res) => {
  try {
    let params = {
      name: req.body.name,
      py: req.body.py,
      price: req.body.price,
    };
    if (req.file) {
      let fileName = Date.now() + "_" + req.file.originalname;
      let newPath = path.resolve(__dirname, "../public/img", fileName);
      let data = fs.readFileSync(req.file.path);
      fs.writeFileSync(newPath, data);
      fs.unlinkSync(req.file.path);
      params.img = `http://47.106.229.181:9090/api/public/img/${fileName}`;
      // params.img = `http://localhost:9090/api/public/img/${fileName}`;
    }

    const goods = new goodsModel(params);
    goods
      .save()
      .then((data) => {
        // console.log(data);
        res.send({
          code: 0,
          message: "新增成功",
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.send({
          code: -1,
          message: "新增失败",
        });
      });
  } catch (err) {
    console.log(err.message);
    res.send({
      code: -1,
      message: "新增失败",
    });
  }
};

// 更新商品信息
const updateGoods = (req, res) => {
  let goods = {};
  if (req.body.py) {
    goods.py = req.body.py;
  }
  if (req.body.name) {
    goods.name = req.body.name;
  }
  if (req.body.price) {
    goods.price = req.body.price;
  }
  console.log(req.file);
  if (req.file) {
    let fileName = Date.now() + "_" + req.file.originalname;
    let newPath = path.resolve(__dirname, "../public/img", fileName);
    let data = fs.readFileSync(req.file.path);
    fs.writeFileSync(newPath, data);
    fs.unlinkSync(req.file.path);
    goods.img = `http://47.106.229.181:9090/api/public/img/${fileName}`;
    // goods.img = `http://localhost:9090/api/public/img/${fileName}`;
  }
  if (!req.body.id) {
    res.send({
      code: -1,
      message: "修改失败",
    });
    return;
  }
  goodsModel
    .updateOne({ _id: req.body.id }, goods)
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
};

const delGoods = (req, res) => {
  if (!req.query.id) {
    res.send({
      code: -1,
      messsage: "删除失败",
    });
    return;
  }
  goodsModel
    .findOneAndDelete({ _id: req.query.id })
    .then((data) => {
      if (data) {
        res.send({
          code: 0,
          message: "删除成功",
        });
      } else {
        res.send({ code: -1, message: "删除失败" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.send({
        code: -1,
        message: "删除失败",
      });
    });
};

module.exports = {
  getGoods,
  addGoods,
  updateGoods,
  delGoods,
  getInfo,
};
