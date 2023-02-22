
var trex ,trex_running;
var cloud,cloudImage;

var obstacle,obstacle1,obstacle2,
obstacle3,obstacle4,obstacle5,obstacle6;
var rand;

var Score;
var play = 1;
var end = 0;
var GameState = play;
var cloudsGroup,obstaclesGroup;
var ground, groundImage,invisibleGround;

var gameOver, gameOverImg
var restart, restartImg;
var trex_collided;

var jumpSound, dieSound, checkPointsound;


function preload(){
  
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkPointsound = loadSound("checkPoint.mp3");

groundImage = loadImage("ground2.png");
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided = loadImage("trex_collided.png")
cloudImage = loadImage("cloud.png");

//imagenes obstaculos

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //Game Over

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;

restart = createSprite(300,150);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;


//grupos
obstaclesGroup = new Group();
cloudsGroup = new Group();

  invisibleGround = createSprite(200,178,400,10);
  invisibleGround.visible = false;
  
  //crear sprite de Trex

  trex = createSprite(60,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider("circle",-8,0,24);
  trex.scale = 0.9;
  //suelo

  ground = createSprite(200,173,400,20);

  Score = 0;
}

function draw(){
  background("white");


  text ("puntuacion" + Score,500,50);
  
//Play and End

  if(GameState == play){
    Score = Score + Math.round(getFrameRate()/60);


    spawnObstacles();
    SpawnCloud();

 if (Score > 0 && Score % 1000 == 0){
  checkPointsound.play();
 }

  
//mover el suelo
 ground.velocityX = -2;
 ground.velocityX = -(4 +3 * Score/10);

 if (keyDown("space") && trex.y >= 100){
  trex.velocityY = -10;
  jumpSound.play();
}
 
if(ground.x < 0){
  ground.x = ground.width/2;
}

if(obstaclesGroup.isTouching(trex)){
  GameState = end
 dieSound.play()
}
}else if(GameState == end){
ground.velocityX = 0;
restart.visible = true;
gameOver.visible = true;
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
trex.changeAnimation("collided", trex_collided)
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

  }


  if(mousePressedOver(restart)){
    reset();
  }


  //restablecer suelo

  ground.addImage("ground", groundImage);
  
  trex.velocityY = trex.velocityY + 0.8;

  trex.collide(invisibleGround);

  if (Score == 1500){
    background("gray");
  }

  drawSprites();
}



function SpawnCloud(){
if(frameCount % 60 == 0){

  cloud = createSprite(600,100,40,10);
  cloud.velocityX = -3;
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;

  cloud.y = Math.round(random(10,100));

 cloud.depth = trex.depth;
 trex.depth = trex.depth +1;
 restart = trex.depth;

cloud.lifetime = 210;

cloudsGroup.add(cloud);
 }
}

function spawnObstacles(){
  if (frameCount % 60 == 0){

    obstacle = createSprite(590,151,10,30);
    obstacle.velocityX = -3;

    obstacle.scale = 0.5;
  obstacle2.scale = 1;
   obstacle3.scale = 1.5;
  obstacle1.scale = 0.5;
   obstacle6.scale = 3;

    rand = Math.round(random(1,6));

    switch(rand){ 
      
      case 1:
       obstacle.addImage(obstacle1);
       obstacle.scale = 0.2;
       break;

      case 2:
        obstacle.addImage(obstacle2);
        obstacle.scale = 0.4;
        break;

      case 3:
       obstacle.addImage(obstacle3);
       obstacle.scale = 0.01;
       break;

      case 4:
        obstacle.addImage(obstacle4);
        obstacle.scale = 0.5;
        break;

      case 5:
       obstacle.addImage(obstacle5);
       obstacle.scale = 0.5;
       break;

      case 6:
        obstacle.addImage(obstacle6);
         break;
         
         default:break;
    }

    obstacle.lifetime = 298;
   obstaclesGroup.add(obstacle);

   obstaclesGroup.velocityX = -(6 + Score/100);
 
  }
}

function reset(){
   GameState = play;
   gameOver.visible = false;
   restart.visible = false;
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
    trex.changeAnimation("running", trex_running);

    Score = 0;
}