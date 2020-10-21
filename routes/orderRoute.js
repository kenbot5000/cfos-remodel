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
    let student = await Student.findOne({student_no: req.body.student_no})
    let newOrder = new Order({
      student: student,
      total: 0,
      active: false
    });
    await newOrder.save();
    res.status(201).json({res: newOrder});
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
  }).patch(async (req, res) => {
    // Set as active/inactive
    req.order.active = req.body.active
    req.order.save()
    res.sendStatus(204)
  })
  .delete(async (req, res) => {
    await req.order.deleteOne();
    res.sendStatus(204);
  });

// Add item to existing order
router.post("/:id", async (req, res) => {
  let order = await Order.findById(req.params.id);
  let item = await Menu.findOne({ name: req.body.name });
  
  // Searches order if item was already previously added
  let orderItemSearch = order.items.findIndex((searchItem, index) => {
    return searchItem.name == item.name
  })

  // Pushes new item to order
  if (orderItemSearch == -1) {
    // Formats new order item
    let orderItem = {
      name: item.name,
      price: item.price,
      count: 0
    }
    order.items.push(orderItem);
    console.log(order.items)
    orderItemSearch = order.items.length - 1
  }
  // Existing order item
    order.items[orderItemSearch].count += 1
    order.total += order.items[orderItemSearch].price
  
  await order.save();
  res.json({ res: order });
});

module.exports = router;
