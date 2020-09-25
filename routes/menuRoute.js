const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const db = require("../db");
const Menu = require("../models/Menu");

router.get("/", async (req, res) => {
  menu = await Menu.find();
  res.json({ res: menu });
});

router.post("/", async (req, res) => {
  let newMenu = new Menu({
    name: req.body.name,
    price: req.body.price,
    active: req.body.active,
  });
  await newMenu.save();
  res.sendStatus(201);
});

router.get("/search", async (req, res) => {
  if (req.query.id) {
    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
      let menu = await Menu.findById(req.query.id);
      if (menu) {
        res.json({ res: menu });
      } else {
        res.status(404).json({ message: "Item does not exist" });
      }
    } else {
      res.status(400).json({ message: "Not a valid id" });
    }
  } else if (req.query.name) {
    let regex = new RegExp(req.query.name, "i");
    if (await Menu.exists({ name: regex })) {
      let menu = await Menu.findOne({ name: regex });
      res.json({ res: menu });
    } else {
      res.status(404).json({ message: "Item does not exist" });
    }
  } else {
    res.status(400).json({ message: "Must supply a GET query: id, name" });
  }
});

router.patch("/search", async (req, res) => {
  if (req.query.id) {
    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
      let menu = await Menu.findById(req.query.id);
      if (menu) {
        menu.name = req.body.name;
        menu.price = req.body.price;
        menu.active = req.body.active;
        menu.save();
        res.json({ res: menu });
      } else {
        res.status(404).json({ message: "Item does not exist" });
      }
    } else {
      res.status(400).json({ message: "Not a valid id" });
    }
  } else {
    res.status(400).json({ message: "Must supply a GET query: id, name" });
  }
});

router.delete("/search", async (req, res) => {
  if (req.query.id) {
    let itemExists = await Menu.exists({ _id: req.query.id });
    if (itemExists) {
      await Menu.findOneAndDelete({});
    } else {
      res.status(404).json({ message: "Item does not exist" });
    }
  } else {
    res.status(400).json({ message: "Must supply a GET query: id" });
  }
});
module.exports = router;
