const express = require("express");
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  consola.info({message:'Connection to IO initialized.', badge: true})
  socket.on('finalize_order', (order) => {
    io.emit('decrement_stock', order)
  })
})

module.exports = {app, server}