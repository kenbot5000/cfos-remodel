const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('../db');
const User = require('../models/User');

router.get('/', async (req, res) => {
  let users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  let userExists = await User.exists({username: req.body.username})
  if(userExists) {
    res.status(400).json({message: 'Username already exists'}) 
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    await newUser.save()
    res.sendStatus(201)
  }
});

router.get('/search', async (req, res) => {
  if(req.query.id) {
    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
      let user = await User.findById(req.query.id);
      if(user) {
        res.json({res: user})
      } else {
        res.status(404).json({message: 'User does not exist'}) 
      }
    } else {
      res.status(400).json({message: 'Not a valid id'})
    }
  } else if(req.query.username) {
    if(await User.exists({username: req.query.username})) {
      let user = await User.findOne({username: req.query.username});
      res.json({res: user});
    } else {
      res.status(404).json({message: 'User does not exist'})
    }
  } else {
    res.status(400).json({message: 'Must supply a GET query: id, username'})
  }
});

router.patch('/search', async (req, res) => {
  let userExists = await User.exists({_id: req.query.id})
  if(userExists) {
    let user = await User.findOne({_id: req.query.id})
    user.username = req.body.username;
    user.password = req.body.password;
    await user.save()
    res.json({res: user})
  } else {
    res.status(404).json({message: 'User does not exist'})
  }
});

module.exports = router;