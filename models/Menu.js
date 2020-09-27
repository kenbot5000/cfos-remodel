const mongoose = require('mongoose');
let Schema = require('mongoose').Schema;

const MenuSchema = new Schema({
  name: String,
  price: Number,
  active: Boolean
})

const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu;