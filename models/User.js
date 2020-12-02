const mongoose = require('mongoose')
let Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  lastname: String,
  firstname: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User;