/*
* Geometry.io
* sketch.js
*
* Character visualization
* Developer: Nathan Shepherd
*/
var socket;

var player;
var players = [];
var zoom = 1;
var startR = 6;

function setup() {
  createCanvas(800, 800);

  socket = io.connect('http://localhost:3000');

  player = new Player(random(width), random(height), random(30, 40));
  var data = { //broadcasted to server
    x: player.pos.x,
    y: player.pos.y,
    r: player.r,
    id: 'temp'
  };

  socket.emit('start', data);

  socket.on('heartbeat',
    function(data) {
      console.log(data);
    })

  for (var i = 0; i < 80; ++i) {
    var x = random(-width, width);
    var y =  random(-height, height);
    players[i] = new Player(x , y, 6);
  }
}

function draw() {
  background(0);

  translate(width/2 , height/2);
  var newzoom = 36 / player.r;
  zoom = lerp(zoom, newzoom, 0.1); //linear interpolation (to, from, rate)
  scale(zoom);
  scale(36 / player.r)
  translate(-player.pos.x, -player.pos.y);
  player.show();
  player.update();
  player.constrain();
/*
  for (var i = players.length - 1; i >= 0; --i) {
    players[i].show();
    if(player.interacts(players[i])) {
      player.affect(players[i]);
      players.splice(i, 1);
    }
  }
  */
/*  if (mouseIsPressed) {
    player.shoot();
  }
*/
  /*
  var data = { //broadcasted to server
    x: player.pos.x,
    y: player.pos.y,
    r: player.r,
  };
  socket.emit('update', data);
  */
}
