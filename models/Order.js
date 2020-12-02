const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const OrderSchema = new Schema({
  student: Object,
  items: [{name: String, price: Number, count: Number}],
  total: Number,
  active: Boolean,
  date: Date,
  seller: String
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
