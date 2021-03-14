const db = require("../config/db");

const goodsSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  py: {
    type: String,
    required: true,
  },
  img: String,
});

module.exports = db.model("good", goodsSchema);
