const express = require("express");
const router = express.Router();
const db = require("../db");
const Student = require("../models/Student");

router.get("/", async (req, res) => {
  let students = await Student.find();
  res.json({ res: students });
});

router.post("/", async (req, res) => {
  let newStudent = new Student({
    student_no: req.body.student_no,
    lname: req.body.lname,
    fname: req.body.fname,
  });

  await newStudent.save();
  res.sendStatus(201);
});

router
  .route("/:id")
  .all(async (req, res, next) => {
    let studentExists = await Student.exists({ student_no: req.params.id });
    if (studentExists) {
      req.student = await Student.findOne({ student_no: req.params.id });
      next();
    } else {
      res.statusCode(404);
    }
  })
  .get(async (req, res) => {
    console.log(req.student);
    res.json({ res: req.student });
  })
  .patch(async (req, res) => {
    req.student.student_no = req.body.student_no;
    req.student.fname = req.body.fname;
    req.student.lname = req.body.lname;
    await req.student.save();
    res.json({ res: req.student });
  })
  .delete(async (req, res) => {
    await req.student.deleteOne();
    res.sendStatus(204);
  });

module.exports = router;
