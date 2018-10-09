var xCanvas = 1000;
var yCanvas = 600;
var cloudImg;
var objCloud;

function preload(){
  cloudImg = loadImage("files/images/cloud.png");
}

function setup(){
  createCanvas(xCanvas, yCanvas);
  objCloud = new makeCloud(50, 200, 100, 50, 0.5);
}

function draw(){
  background(0, 191, 255);
  mountains();
  //cloud();
}

function mountains(){
  stroke(0);
  fill(153, 255, 25);
  triangle(625, 600, 825, 410, 1125, 600);
  triangle(50, 600, 350, 380, 650, 600);
  triangle(300, 600, 625, 350, 1050, 600);
  triangle(-200, 600, 50, 300, 400, 600);
  triangle(800, 600, 1050, 300, 1400, 600);
}

function cloud(){
  objCloud.moveCloud();
  image(cloudImg, objCloud.xPos, objCloud.yPos, objCloud.xSize, objCloud.ySize);
  if (objCloud.xPos + objCloud.xSize >= width){
    image(cloudImg, objCloud.xPos-width, objCloud.yPos, objCloud.xSize, objCloud.ySize);
  }
  if (objCloud.xPos>=width){
    objCloud.xPos -= width;
  }
}

this.makeCloud = function(x, y, xS, yS, s){
  this.xPos = x;
  this.yPos = y;
  this.xSize = xS;
  this.ySize = yS;
  this.xSize = xS
  this.speed = s;

  this.moveCloud = function(){
    this.xPos += this.speed;
  }
}
