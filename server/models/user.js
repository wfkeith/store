const db = require("../config/db");

const UserSchema = new db.Schema({
  account: {
    type: String,
    required: true,
    createIndexes: true, //确保唯一账户
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = db.model("user", UserSchema);
