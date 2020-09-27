const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const OrderSchema = new Schema({
  student: Object,
  items: [Schema.Types.Mixed],
  total: Number
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
