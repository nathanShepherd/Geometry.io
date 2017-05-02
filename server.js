// All players on server
var players = [];

function Player(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
}

var express = require('express');
var app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000);
console.log("Server initialized to port 3000");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', function newConnection (socket) {
  console.log("new connection: ");

  socket.on('start', function (data) {
    data.id = socket.id;
    console.log(data.id +" "+ data.x +" "+ data.y +" "+ data.r);
    var player = new Player(data.x, data.y, data.r, data.id);
    players.push(player);
  })
/*
  socket.on('update', function (data) {
    for (var i = 0; i < players.length; i++) {
      if (socket.id == players[i].id) {
        console.log(socket.id +" "+ data.x +" "+ data.y +" "+ data.r);
        players[i].pos.x = data.x;
        players[i].pos.y = data.y;
        players[i].r = data.r;
      }
    }
  })*/
})

setInterval(heartbeat, 1000);
function heartbeat() {
  for (var i = 0; i < players.length; ++i) {
    io.sockets.emit('heartbeat', players[i].x);
  }
}
heartbeat();
