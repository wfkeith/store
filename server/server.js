const express = require("express");
const app = express();
const router = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(router);

app.get("/", (req, res) => {
  res.send("服务器访问成功");
});

app.listen(9090);
console.log("服务启动成功");
