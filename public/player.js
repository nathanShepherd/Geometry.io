/*
* Geometry.io
* player.js
*
* Blob is the character class
* Developer: Nathan Shepherd
*/

function Player(x, y, r, id) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0,0);

  this.update = function() {
    var newVel = createVector(mouseX - width/2, mouseY - height/2);
    newVel.setMag(3);
    this.vel.lerp(newVel, 0.1);
    this.pos.add(this.vel);
  }
/*
  this.shoot = function(this) {
    var obj = new Object(this);
    obj.vel = createVector(2*this.vel.x, 2*this.vel.y);
  }
*/
  this.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

  this.interacts = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }

  this.constrain = function() {
    player.pos.x = constrain(player.pos.x, -width, width);
    player.pos.y = constrain(player.pos.y, -height, height);
  }

  this.affect = function(other) {
    if (this.interacts(other)) {
      var areaSum = (PI * this.r * this.r) + (PI * other.r * other.r);
      this.r = sqrt(areaSum / PI);
    }
  }
}

function Object(player) {
  ellipse(this.pos.x, this.pos.y, this.vel.x, this.vel.y);
}
