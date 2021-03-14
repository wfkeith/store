const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/store";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库链接失败");
    console.log(err);
  });

module.exports = mongoose;
