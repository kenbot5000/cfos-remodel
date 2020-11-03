const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const db = require("../db");
const Menu = require("../models/Menu");

/**
 * 
 * MAKE SURE THE POST AND PATCH ROUTES ARE UPDATED TO REFLECT THE MODEL
 * 
 */

router.get("/", async (req, res) => {
  menu = await Menu.find();
  res.json({ res: menu });
});

router.post("/", async (req, res) => {
  let newMenu = new Menu({
    name: req.body.name,
    category: req.body.category,
    temp: req.body.temp,
    flavor: req.body.flavor,
    price: req.body.price,
    active: req.body.active,
    stock: req.body.stock
  });
  await newMenu.save();
  res.sendStatus(201);
});

router.get("/search", async (req, res) => {
  // Search for menu by ID
  if (req.query.id) {
    // This ensures that the ID is a valid MongoDB ID
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
  // Search for menu by name
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

// Edit menu item
router.patch("/search", async (req, res) => {
  let menu;

  if(req.query.id) {
    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
      menu = await Menu.findById(req.query.id)
    } else {
      res.status(400).json({ message: "Not a valid id" })
    }
  }
  else if (req.query.name) {
    menu = await Menu.findOne({ name: req.query.name })
  }
  else {
    res.status(400).json({ message: "Must supply a GET query: id" })
  }
  if (menu) {
    menu.name = req.body.name;
    menu.category = req.body.category;
    menu.temp = req.body.temp;
    menu.flavor = req.body.flavor;
    menu.price = req.body.price;
    menu.active = req.body.active;
    menu.stock = req.body.stock;
    menu.save();
    res.json({ res: menu });
  } else {
    res.status(404).json({ message: "Item does not exist" });
  } 
});

router.delete("/search", async (req, res) => {
  if (req.query.id) {
    let itemExists = await Menu.exists({ _id: req.query.id });
    if (itemExists) {
      await Menu.findOneAndDelete({_id: req.query.id});
      res.sendStatus(204)
    } else {
      res.status(404).json({ message: "Item does not exist" });
    }
  } else {
    res.status(400).json({ message: "Must supply a GET query: id" });
  }
});
module.exports = router;
