var lijstBallen = [];
var range = 10;
var ball;
var aBallen = 10;

function setup(){
  createCanvas(1000, 600);
  background(220);
  //xPos, yPos, xSpeed, ySpeed, size, r, g, b, listPlace
  for (var i=0; i<aBallen; i++){
    speedListX = [random(-3, -1), random(1, 3)];
    speedListY = [random(-3, -1), random(1, 3)];
    ball = new makeBall(floor(random(range, width-range)), floor(random(range, height-range)), random(speedListX),  random(speedListY), range, random(0, 255), random(0, 255), random(0, 255), i);
    lijstBallen.push(ball);
  }
}

function draw(){
  background(220);
  for (var i=0; i<aBallen; i++){
    ball = lijstBallen[i];
    ball.collisionBalls();
    ball.collisionWalls();
  }
  for (var i=0; i<aBallen; i++){
    ball = lijstBallen[i];
    ball.move();
  }
}

function keyPressed(){
  if (keyCode==32){
    draw();
  }
}

function makeBall(xPos, yPos, xSpeed, ySpeed, ballSize, r, g, b, listPlace){
  this.xPos = xPos;
  this.yPos = yPos;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = ballSize;
  this.red = r;
  this.green = g;
  this.blue = b;
  this.listPlace = listPlace;

  this.collisionBalls = function(){
    for (var a=0; a<aBallen; a++){
      if (this.listPlace !== a){
        var dX = lijstBallen[a].xPos-this.xPos;
        var dY = lijstBallen[a].yPos-this.yPos;
        if (sqrt(dX*dX+dY*dY) < lijstBallen[a].size+this.size){
          this.xSpeed = -this.xSpeed;
          this.ySpeed = -this.ySpeed;
        }
      }
    }
  }

  this.collisionWalls = function(){
    if (this.xPos < this.size || this.xPos+this.size > width){
      this.xSpeed = -this.xSpeed;
    }
    if (this.yPos < this.size || this.yPos+this.size > height){
      this.ySpeed = -this.ySpeed;
    }
  }

  this.move = function(){
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    fill(this.red, this.green, this.blue);
    ellipse(this.xPos, this.yPos, this.size*2, this.size*2);
  }
}
