const mongoose = require('mongoose');
let Schema = require('mongoose').Schema;

const MenuSchema = new Schema({
  name: String,
  category: String,
  temp: String,
  flavor: [String],
  price: Number,
  active: Boolean,
  stock: Number
})

const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu;