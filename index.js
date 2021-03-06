const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

usersConnected = 0

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('usersConnected', ++usersConnected)
    console.log("users: " + usersConnected)
    io.emit('chat message', socket.id + " joined");
    socket.on('disconnect', (usr) => {
      console.log('user disconnected');
      io.emit('usersConnected', --usersConnected)
      console.log("users: " + usersConnected)
    io.emit('chat message', socket.id + " joined");
      io.emit('chat message', socket.id + " disconnected");
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', socket.id + ": " + msg);
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
