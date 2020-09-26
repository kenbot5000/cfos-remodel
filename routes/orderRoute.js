const express = require("express");
const router = express.Router();
const db = require("../db");
const Order = require("../models/Order");
const Menu = require("../models/Menu");
const Student = require("../models/Student");

// Get all orders
router.get("/", async (req, res) => {
  let orders = await Order.find();
  res.json({ res: orders });
});

// Create new order
router.post("/", async (req, res) => {
  let studentExists = await Student.exists({ student_no: req.body.student_no });
  if (studentExists) {
    let newOrder = new Order({
      student_no: req.body.student_no,
    });
    await newOrder.save();
    res.sendStatus(201);
  } else {
    res.status(404).json({ message: "Student not found!" });
  }
});

// Get and delete order
router
  .route("/:id")
  .all(async (req, res, next) => {
    req.order = await Order.findById(req.params.id);
    next();
  })
  .get(async (req, res) => {
    res.json({ res: req.order });
  })
  .delete(async (req, res) => {
    await req.order.deleteOne();
    res.sendStatus(204);
  });

// Add item to existing order
router.post("/:id/add", async (req, res) => {
  let order = await Order.findById(req.params.id);
  let item = await Menu.findOne({ name: req.body.name });
  order.items.push(item);
  await order.save();
  res.json({ res: order });
});

module.exports = router;
