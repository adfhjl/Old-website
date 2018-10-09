var xCanvas = 1000;
var yCanvas = 600;
var backgroundColor = 220;
var backgroundTheme = 0;
var cubeXLocation = xCanvas/2;
var cubeYLocation = yCanvas/2;
var cubeXPoint = cubeXLocation-200;
var cubeYPoint = cubeYLocation-200;
var cubeLength = 400;
var hud = "menu";
var arrows = 1;
var leftCube = cubeXLocation-180;
var rightCube = cubeXLocation+180;
var controls = "Arrows";
var aauY = 300;
var maxShopPlace = 2;
var shopPlace = 0;
var aCoins = 0;
var gameDefined=1;
var time;
var points;
var firstTimeDef;
var bad;
var points;
var coinPlus;
var reactTime;
var difficulty = "normal";
var good;
var ascSide;
var ascSide1;
var ascSide2;
var savedCoins;
var rememberDirect;
var drawingLine;
var cubeTurnTime;
var highScore = 0;
var lineXCords;
var lineYCords;
var shopStats = {equipped:"nothing",
                nothing:"unlocked",
                mountains:"locked",
                balls:"locked"};
var shopPrices = {mountains:"300",
                  balls:"1000"};
controls = "arrows";
left = 37;
up = 38;
right = 39;
down = 40;
////////////////////////////////////
var cloudImg;
var objCloud;
////////////////////////////////////
var invisable = -1;
var settingsPlace = 0;
var maxSettingsPlace = 1;
var settingsPijl0;
var settingsPijl1;
var timerVisable = "visable";
var nTimerVisable = 1;
var savedShopStatsMountains;
var savedShopStatsBalls;
////////////////////////////////////
var lijstBallen = [];
var range = 10;
var ball;
var aBallen = 15;
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function preload(){
  mountainImg = loadImage("Files/Images/bergen.PNG");
  cloudImg = loadImage("Files/Images/cloud.png");
  fullMountainImg = loadImage("Files/Images/alleBergen.PNG");
}

function setup() {
  objCloud = new makeCloud(50, 200, 100, 50, 0.5);
  savedCoins = localStorage.getItem("savedCoins");
  if (savedCoins !== null){
    aCoins = parseInt(savedCoins);
  }
  savedHighScore = localStorage.getItem("savedHighScore");
  if (savedHighScore !== null){
    highScore = parseInt(savedHighScore);
  }
  savedShopStatsMountains = localStorage.getItem("savedShopStatsMountains");
  if (savedShopStatsMountains !== null){
    shopStats["mountains"] = savedShopStatsMountains;
  }
  savedShopStatsBalls = localStorage.getItem("savedShopStatsBalls");
  if (savedShopStatsBalls !== null){
    shopStats["balls"] = savedShopStatsBalls;
  }
  createCanvas(xCanvas, yCanvas);
  //xPos, yPos, xSpeed, ySpeed, size, r, g, b, listPlace
  for (var i=0; i<aBallen; i++){
    speedListX = [random(-3, -1), random(1, 3)];
    speedListY = [random(-3, -1), random(1, 3)];
    ball = new makeBall(floor(random(range, width-range)), floor(random(range, height-range)), random(speedListX),  random(speedListY), range, random(0, 255), random(0, 255), random(0, 255), i);
    lijstBallen.push(ball);
  }
}

function draw() {
  //Basis van de game
  background(backgroundColor);
  gameBackground();
  if (invisable != 1){
    if (!drawingLine){
      theGameCalculations();
      gameScreen();
      localStorage.setItem("savedCoins", aCoins);
      localStorage.setItem("savedHighScore", highScore);
      localStorage.setItem("savedShopStatsMountains", shopStats["mountains"]);
      localStorage.setItem("savedShopStatsBalls", shopStats["balls"]);
    }
    else {
      cubeTurnAnimation();
    }
  }
}

function keyPressed(){
  if (invisable != 1){
    if (hud=="menu"){
      menuPressed();
    }
    else if (hud=="settings"){
      settingsPressed();
    }
    else if (hud=="shop"){
      shopPressed();
    }
    else if (hud=="play"){
      playPressed();
    }
  }
  else{
    invisable = invisable*-1;
  }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function gameBackground(){
  //Keuze van de achtergrond
  if (shopStats["uquipped"]=="nothing"){
    background(backgroundColor);
  }
  if (shopStats["equipped"]=="mountains"){
    hillsBackground();
  }
  if (shopStats["equipped"]=="balls"){
    ballsBackground();
  }
}

function hillsBackground(){
  background(0, 191, 255);
  image(fullMountainImg, 0, 0 , width, height);
  cloud();
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

function ballsBackground(){
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
    stroke(0);
    strokeWeight(1);
    ellipse(this.xPos, this.yPos, this.size*2, this.size*2);
    noStroke();
  }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function theGameCalculations(){
  //Test voor de controls
  if (arrows==1){
    controls="arrows";
    left=37;
    up=38;
    right=39;
    down=40;
  }
  else{
    controls="wasd";
    left=65;
    up=87;
    right=68;
    down=83;
  }
  if (nTimerVisable==1){
    timerVisable = "visable";
  }
  if (nTimerVisable==-1){
    timerVisable = "invisable";
  }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////WAT JE ZIET/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function gameScreen(){
  drawCube();
  cubeText();
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function drawCube(){
  cubeEdge(0, 5);
  innerCube(255);
}

function cubeEdge(color, strokeColor){
  fill(color, color, color);
  stroke(strokeColor);
  strokeWeight(0);
  rect(cubeXPoint, cubeYPoint, cubeLength, cubeLength);
  noStroke();
}

function innerCube(color){
  fill(color, color, color);
  rect(cubeXPoint+1, cubeYPoint+1, cubeLength-2, cubeLength-2);
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function cubeText(){
  if (hud == "menu"){
    hudMenu();
  }
  if (hud == "play"){
    theGame();
  }
  if (hud == "shop"){
    hudShop();
  }
  if (hud == "settings"){
    hudSettings();
  }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function hudMenu(){
  theCubeText();
  sideText("Shop", leftCube, cubeYLocation-40, cubeYLocation+40);
  sideText("Settings", rightCube, cubeYLocation-100, cubeYLocation+100);
  textSize(25);
  text("Play", cubeXLocation, cubeYLocation-160);
  text("dissapear!", cubeXLocation, cubeYLocation+180);
  textAlign(LEFT, CENTER);
  text("The Highscore = " + highScore, 750, 150);
}

function theCubeText(){
  fill(0, 0, 0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("The", width/2, height/2.5);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("CUBE", width/2, height/2);
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function theGame(){
  textSides();
  if (firstTimeDef==0){
    bad = 0;
    points=0;
    firstTimeDef=1;
    coinPlus=1;
    gameDefined=1;
    reactTime=1900;
  }
  if (gameDefined==1){
    good=0;
    sides = ["left", "left", "left", "up", "up", "up", "right", "right", "right", "down", "down", "down", "notLeft", "notUp", "notRight", "notDown"];
    goodSide = random(sides);
    goodSideToAS(goodSide);
    goodCommand = {left:["left", "left", "not not left", "opposite of right"],
                up:["up", "up", "not not up", "opposite of down"],
                right:["right", "right", "not not right", "opposite of left"],
                down:["down", "down", "not not down", "opposite of up"],
                notLeft:["not left"],
                notUp:["not up"],
                notRight:["not right"],
                notDown:["not down"]};
    seenCommand = random(goodCommand[goodSide]);
    time = millis();
    gameDefined=0;
    reactTime = reactTime-50;
    if (reactTime < 800){
      reactTime = 800;
    }
  }
  if (bad==0){
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(seenCommand, cubeXLocation, cubeYLocation/4);
  }
  if (time+reactTime < millis()){
    bad=1;
  }
  if (bad==1){
    makeCoin(cubeXLocation, cubeYLocation);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text("+", cubeXLocation-30, cubeYLocation);
    textAlign(LEFT, CENTER);
    text(points, cubeXLocation+15, cubeYLocation);
    if (coinPlus==1){
      aCoins+= points;
      coinPlus=0;
    }
    if (highScore < points){
      highScore = points;
    }
  }
  else if (good==1){
    gameDefined=1;
    points+=1;
    cubeTurnTime = millis();
    if (rememberDirect==left){
      lineXCords = cubeXLocation-200;
    }
    if (rememberDirect==right){
      lineXCords = cubeXLocation+200;
    }
    if (rememberDirect==up){
      lineYCords = cubeYLocation-200;
    }
    if (rememberDirect==down){
      lineYCords = cubeYLocation+200;
    }
    cubeTurnAnimation();
  }
  if (time+reactTime+2000 < millis()){
    hud = "menu";
  }
  if (nTimerVisable == 1){
    if (bad==0){
      timer();
    }
  }
}

function timer(){
  fill(255, 255, 255);
  stroke(0);
  strokeWeight(1);
  rect(300, 525, 400, 50);
  noStroke();
  timerCalculation(time, reactTime);
}

function timerCalculation(t, rt){
  var calculationForMap = rt-(millis()-t);
  var colorRedCalc = map(calculationForMap, 0, reactTime, 255, 0);
  var colorGreenCalc = map(calculationForMap, 0, reactTime, 0, 255);
  fill(colorRedCalc, colorGreenCalc, 0);
  var distanceTimer = map(calculationForMap, 0 , reactTime, 0, 398);
  rect(301, 526, distanceTimer, 49);
}

function textSides(){
  fill(0, 0, 0);
  sideText("Left", leftCube, cubeYLocation-40, cubeYLocation+40);
  sideText("Right", rightCube, cubeYLocation-55, cubeYLocation+55);
  textAlign(CENTER, CENTER);
  text("up", cubeXLocation, cubeYLocation-170);
  text("down", cubeXLocation, cubeYLocation+160);
}

function goodSideToAS(gs){
  //beslissing voor goede kanten
  if (gs=="left"){
    ascSide=left;
    ascSide1=0;
    ascSide2=0;
  }
  if (gs=="up"){
    ascSide=up;
    ascSide1=0;
    ascSide2=0;
  }
  if (gs=="right"){
    ascSide=right;
    ascSide1=0;
    ascSide2=0;
  }
  if (gs=="down"){
    ascSide=down;
    ascSide1=0;
    ascSide2=0;
  }
  if (gs=="notLeft"){
    ascSide=up;
    ascSide1=right;
    ascSide2=down;
  }
  if (gs=="notUp"){
    ascSide=left;
    ascSide1=right;
    ascSide2=down;
  }
  if (gs=="notRight"){
    ascSide=up;
    ascSide1=left;
    ascSide2=down;
  }
  if (gs=="notDown"){
    ascSide=up;
    ascSide1=right;
    ascSide2=left;
  }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function cubeTurnAnimation(){
  drawCube();
  stroke(0);
  strokeWeight(1);
  if (cubeTurnTime+400 > millis()){
    drawingLine = true;
    fill(0, 0 , 0);
    if (rememberDirect==left || rememberDirect==right){
      turnHorizon();
    }
    else{
      turnVertical();
    }
  }
  else {
    drawingLine = false;
  }
}

function turnHorizon(){
  if (rememberDirect==left){
    turnLeft();
  }
  else{
    turnRight();
  }
}

function turnLeft(){
  line(lineXCords, cubeYLocation-200, lineXCords, cubeYLocation+200);
  lineXCords += 18;
}

function turnRight(){
  line(lineXCords, cubeYLocation-200, lineXCords, cubeYLocation+200);
  lineXCords -= 18;
}

function turnVertical(){
  if (rememberDirect==up){
    turnUp();
  }
  else{
    turnDown();
  }
}

function turnUp(){
  line(cubeXLocation-200, lineYCords, cubeXLocation+200, lineYCords);
  lineYCords += 18;
}

function turnDown(){
  line(cubeXLocation-200, lineYCords, cubeXLocation+200, lineYCords);
  lineYCords -= 18;
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function hudShop(){
  fill(0, 0, 0);
  sideText("Menu", rightCube, cubeYLocation-40, cubeYLocation+40);
  var square=130;
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(cubeXLocation-square, cubeYLocation-square, square*2, square*2);
  shopPreview();
  makeCoin(cubeXLocation, cubeYLocation/2);
  coinWriting();
  textAlign(CENTER, BOTTOM);
  noStroke();
  textSize(23);
  if (shopPlace < maxShopPlace){
    text("Next", cubeXLocation, cubeYLocation-160);
  }
  if (shopPlace > 0){
    text("Previous", cubeXLocation, cubeYLocation+160);
  }
}

function coinWriting(){
  textAlign(LEFT, CENTER);
  textSize(23);
  fill(0, 0, 0);
  if (aCoins<10){
    text("000" + aCoins, cubeXLocation+10, cubeYLocation/2);
  }
  else if(aCoins<100){
    text("00" + aCoins, cubeXLocation+10, cubeYLocation/2);
  }
  else if (aCoins<1000){
    text("0" + aCoins, cubeXLocation+10, cubeYLocation/2);
  }
  else{
    text(aCoins, cubeXLocation+10, cubeYLocation/2);
  }
}

function shopPreview(){
  if (shopPlace==0){
    if (shopStats["nothing"]=="unlocked"){
      if (shopStats["equipped"]=="nothing"){
        sideText("equipped", leftCube, cubeYLocation-100, cubeYLocation+100);
      }
      else{
        sideText("equip", leftCube, cubeYLocation-60, cubeYLocation+60);
      }
    }
  }
  if (shopPlace==1){
    if (shopStats["mountains"]=="unlocked"){
      if (shopStats["equipped"]=="mountains"){
        sideText("equipped", leftCube, cubeYLocation-100, cubeYLocation+100);
      }
      else{
        sideText("equip", leftCube, cubeYLocation-60, cubeYLocation+60);
      }
    }
    else{
      sideText("Buy", leftCube, cubeYLocation-30, cubeYLocation+30);
      makeCoin(leftCube+20, cubeYLocation-65);
      sideText(shopPrices["mountains"], leftCube+20, cubeYLocation-30, cubeYLocation+30);
    }
    image(mountainImg, cubeXLocation-130, cubeYLocation-130, 260, 260);
  }
  if (shopPlace==2){
    if (shopStats["balls"]=="unlocked"){
      if (shopStats["equipped"]=="balls"){
        sideText("equipped", leftCube, cubeYLocation-100, cubeYLocation+100);
      }
      else{
        sideText("equip", leftCube, cubeYLocation-60, cubeYLocation+60);
      }
    }
    else{
      sideText("Buy", leftCube, cubeYLocation-30, cubeYLocation+30);
      makeCoin(leftCube+20, cubeYLocation-65);
      sideText(shopPrices["balls"], leftCube+20, cubeYLocation-30, cubeYLocation+30);
    }
    fill(200, 50, 235);
    stroke(0);
    strokeWeight(1);
    ellipse(cubeXLocation-105, cubeYLocation-20, 20, 20);
    ellipse(cubeXLocation+20, cubeYLocation+80, 20, 20);
    ellipse(cubeXLocation+30, cubeYLocation-80, 20, 20);
    noStroke();
  }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function hudSettings(){
  fill(0, 0, 0);
  testForArrow();
  sideText("Menu", leftCube, cubeYLocation-40, cubeYLocation+40);
  textAlign(CENTER, CENTER);
  text("Press space to toggle!", cubeXLocation, 550);
  text(settingsPijl0+controls+" are used", 500, aauY);
  text(settingsPijl1+"Timer is "+timerVisable, 500, aauY+20);
}

function testForArrow(){
  if (settingsPlace == 0){settingsPijl0 = "-->";}
  else{settingsPijl0 = "";}
  if (settingsPlace == 1){settingsPijl1 = "-->";}
  else{settingsPijl1 = "";}
}
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////CONTROL USAGE////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function menuPressed(){
  if (keyCode == left){
    hud = "shop";
  }
  if (keyCode == up){
    hud = "play";
    firstTimeDef=0;
  }
  if (keyCode == right){
    hud = "settings";
  }
  if (keyCode == down){
    invisable = invisable*-1
  }
}


function settingsPressed(){
  if (keyCode == left){
    hud = "menu";
  }
  if (keyCode == up){
    if (settingsPlace > 0){
      settingsPlace -= 1;
    }
  }
  if (keyCode == right){
  }
  if (keyCode == down){
    if (settingsPlace < maxSettingsPlace){
      settingsPlace += 1;
    }
  }
  if (keyCode == 32){
    if (settingsPlace == 0){
      arrows = arrows*-1;
    }
    if (settingsPlace == 1){
      nTimerVisable = nTimerVisable*-1;
    }
  }
}

function shopPressed(){
  if (keyCode == left){
    if (shopPlace==0){
      if (shopStats["nothing"]=="unlocked"){
        shopStats["equipped"] = "nothing";
      }
    }
    if (shopPlace==1){
      if (shopStats["mountains"]=="unlocked"){
        shopStats["equipped"] = "mountains";
      }
      else{
        if (shopPrices["mountains"]<=aCoins){
          shopStats["mountains"] = "unlocked";
          aCoins -= shopPrices["mountains"];
        }
      }
    }
    if (shopPlace==2){
      if (shopStats["balls"]=="unlocked"){
        shopStats["equipped"] = "balls";
      }
      else{
        if (shopPrices["balls"]<=aCoins){
          shopStats["balls"] = "unlocked";
          aCoins -= shopPrices["balls"];
        }
      }
    }
  }
  if (keyCode == up){
    if (shopPlace < maxShopPlace){
      shopPlace+=1;
    }
  }
  if (keyCode == right){
    hud = "menu";
  }
  if (keyCode == down){
    if (shopPlace > 0){
      shopPlace-=1;
    }
  }
}

function playPressed(){
  if ((bad==0 && good==0) && (keyCode == left || keyCode == up || keyCode == right || keyCode == down)){
    rememberDirect = keyCode;
    if (keyCode == ascSide || keyCode == ascSide1 || keyCode == ascSide2){
      good=1;
    }
    else{
      bad=1;
    }
  }
  else if(bad==1 && (keyCode == left || keyCode == up || keyCode == right || keyCode == down)){
    hud = "menu";
  }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////HANDIGE FUNCTIES/////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function sideText(theText, xPos, yPos, yEnd){
  //De teksten die aan de zijkanten van de kubes zitten
  for (var p=0; p<theText.length; p++){
    textSize(20);
    textAlign(CENTER, BOTTOM);
    strokeWeight(0);
    fill(0, 0, 0);
    var stringSpace = yEnd-yPos;
    var letterSpace = stringSpace/theText.length;
    var Help = 1/theText.length+1;
    var letterPlace = yPos + letterSpace*p*Help;
    text(theText[p], xPos, letterPlace);
  }
}

function makeCoin(xPos, yPos){
  //Een munt maken
  fill(255, 140, 0);
  stroke(0);
  strokeWeight(0.5);
  ellipse(xPos, yPos, 17, 17);
}
