const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const StudentSchema = new Schema({
  student_no: Number,
  lname: String,
  fname: String,
});

const Student = new mongoose.model("Student", StudentSchema);

module.exports = Student;
