var trex,trex_running;
var backgroundImg;
var jump;
var die;
var score=0;
var PLAY=1;
var END=0;
var obsatclegroup,cloudgroup;
var gamestate=PLAY;
var cloud,cloudimage;
var ground,groundimage,invisibleGround;
var obstacle1,obstacle2,obstacle3,obstacle4;
var gameover,restart,trex_collided;
var game;
var restart1;
function preload(){
  
  trex_running=loadAnimation("trex_1.png", "trex_2.png","trex_3.png");
  trex_collided=loadAnimation("trex_collided.png")

  groundimage=loadImage("ground.png");

  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  gameover=loadImage("gameOver.png");
  restart=loadImage("restart.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  backgroundImg=loadImage("backgroundImg.png");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  // creating trex
trex=createSprite(50,height-70,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collide",trex_collided)
  trex.setCollider("circle",0,0,350)
  trex.scale=.08;

ground=createSprite(width/2,height,width,2);
ground.addImage("ground",groundimage)
ground.velocityX=-4;
ground.x=width/2;
  //adding scale and position to trex
invisibleGround=createSprite(width/2,height-10,width,125);
invisibleGround.shapeColor="#f4cbaa";

obstaclegroup=createGroup();
cloudgroup=createGroup();

trex.debug=false;
game=createSprite(width/2,height/2-50);
game.addImage("gameover",gameover);
game.scale=.5
restart1=createSprite(width/2,height/2)
restart1.addImage("restart",restart)
restart1.scale=.1
}


function draw(){
  //set background color 
  background(backgroundImg);
  clouds();
  obsatcles();
  text("SCORE:"+score,500,50);
  //logging the y position of the trex
  if (gamestate===PLAY) {
    trex.changeAnimation("running",trex_running);
    score=score+Math.round(getFrameRate()/60);
    game.visible=false;
    restart1.visible=false;
    ground.velocityX=-4;
    if(ground.x<0)
    {
    ground.x=ground.width/2;
    }
  //jump when space key is pressed
      if(keyDown("UP_ARROW")&& trex.y>= height-120)
      {
        jump.play();
        trex.velocityY=-10;
      }
    trex.velocityY=trex.velocityY+.8;
    
    if (obstaclegroup.isTouching(trex)) {
      gamestate=END;
      die.play();
    }
}
else if (gamestate===END) {
  trex.changeAnimation("die",trex_collided);
  ground.velocityX=0;
  trex.velocityY=0;
  game.visible=true;
  restart1.visible=true;
  obstaclegroup.setLifetimeEach(-1);
  cloudgroup.setLifetimeEach(-1);
  obstaclegroup.setVelocityXEach(0);
  cloudgroup.setVelocityXEach(0);
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
}
 trex.collide(invisibleGround);
 if (mousePressedOver(restart1)) {
   reset();
 }
  drawSprites();
}
function clouds() {
  if(frameCount%60===0)
  {

  
  cloud=createSprite(width+20,height-300,40,10);
  cloud.addImage("clouds",cloudimage);
  cloud.y=Math.round(random(10,60));
  cloud.scale=.8;
  cloud.velocityX=-3;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloud.lifetime=300
  cloudgroup.add(cloud);
  }
}
function obsatcles() {
  if (frameCount%60===0) {
    var obstacle=createSprite(width,height-95,20,30);
    obstacle.scale=.3;
    obstacle.setCollider("circle",0,0,45);
    obstacle.velocityX=-6;
    var rand=Math.round(random(1,4));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
        case 2:
         obstacle.addImage(obstacle2);
          break;
          case 3:
        obstacle.addImage(obstacle3);
        break;
        case 4:
        obstacle.addImage(obstacle4);
        break;
    }
    obstacle.lifetime=300;
    obstacle.depth=trex.depth;
    trex.depth+=1
    obstaclegroup.add(obstacle);
  }
}
function reset() {
  gamestate=PLAY;
  game.visible=false;
  restart1.visible=false;
  score=0;
}