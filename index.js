const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const broadcastChatMessage = (mes) => {
  io.emit('chat message', mes);
}

io.on('connection', (socket) => {
    broadcastChatMessage('A user disconnected');

    socket.on('chat message', (msg) => {
        broadcastChatMessage(msg);
      });
      
    socket.on('disconnect', broadcastChatMessage('A user disconnected'));
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});