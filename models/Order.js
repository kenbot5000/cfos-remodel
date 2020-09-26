const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const OrderSchema = new Schema({
  student_no: Number,
  items: [Schema.Types.Mixed],
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
