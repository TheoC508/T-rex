var PLAY = 1;
var END = 0;
var trex;
var trex_running;
var ground;
var groundimage;
var invisible;
var rand;
var cloud;
var cloud_Image
var obstacle_1, obstacle_2, obstacle_3, obstacle_4, obstacle_5, obstacle_6;
var score;
var obstacle_group;
var clouds_group;
var gameState = PLAY;
var trex_collided;
var CheckPoint, Jump, Die;
var gameOver, Restart;
var gameOver_I, Restart_I


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimage = loadImage("ground2.png");
  cloud_Image = loadImage("cloud.png");
  obstacle_1 = loadImage("obstacle1.png");
  obstacle_2 = loadImage("obstacle2.png");
  obstacle_3 = loadImage("obstacle3.png");
  obstacle_4 = loadImage("obstacle4.png");
  obstacle_5 = loadImage("obstacle5.png");
  obstacle_6 = loadImage("obstacle6.png");
  CheckPoint = loadSound("checkPoint.mp3");
  Jump = loadSound("jump.mp3");
  Die = loadSound("die.mp3");
  gameOver_I = loadImage("gameOver.png");
  Restart_I = loadImage("restart.png");
  
  
  trex_collided = loadAnimation ("trex_collided.png");

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("trex.r", trex_running);
  trex.addAnimation ("trex_C", trex_collided);
  trex.scale = 0.5;
  trex.debug = true;
  trex.setCollider("circle", 0,0,40);
  

  ground = createSprite(200, 180, 400, 20);
 
  ground.addImage("ground", groundimage);

  invisible = createSprite(200, 190, 400, 10);
  invisible.visible = false;

  score = 0;
  obstacle_group = new Group();
  clouds_group = new Group();
  
  gameOver = createSprite(300,100)
  Restart = createSprite(300,140)
  gameOver.visible = false;
  Restart.visible = false;
   
  gameOver.addImage("game", gameOver_I);
  Restart.addImage("Rest", Restart_I);
  gameOver.scale = 0.5;
  Restart.scale = 0.5;
}

function draw() {
  background(" lightblue");
  text("score: " + score, 500, 50);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    if(score % 100===0 && score>0){
      CheckPoint.play();
    
    }
    if (keyDown("space") && trex.y > 100) {
      trex.velocityY = -10;
      Jump.play();
    }
    clouds();
    trex.velocityY = trex.velocityY + 0.8;
    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    spawnObstacle();
     ground.velocityX = -4-score/50;
    if(trex.isTouching(obstacle_group)){
      gameState = END;
      Die.play();
    }
    
  } 
  else if (gameState === END) {
   ground.velocityX = 0;
   trex.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    clouds_group.setVelocityXEach(0);
    trex.changeAnimation("trex_C", trex_collided);
    clouds_group.setLifetimeEach(-1);
    obstacle_group.setLifetimeEach(-1);
    gameOver.visible = true;
    Restart.visible = true;
    if(mousePressedOver(Restart)){
    Reset();  
    }
    
  }

  trex.collide(invisible);
  drawSprites();

}
function Reset(){
 score = 0;
 obstacle_group.destroyEach();
 clouds_group.destroyEach();
 gameOver.visible = false;
 Restart.visible = false;
 trex.changeAnimation("trex.r", trex_running);
 gameState = PLAY;
 
}

function clouds() {

  if (frameCount % 100 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.velocityX = -3;
    cloud.y = Math.round(random(10, 110));
    trex.depth = cloud.depth + 1;
    cloud.addImage("cloud", cloud_Image);
    cloud.scale = 0.09;
    cloud.lifetime = 220;
    clouds_group.add(cloud);
  }
}

function spawnObstacle() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600, 170, 10, 10);
    obstacle.velocityX = -6-score/100;
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage("obstacle1", obstacle_1);
        break;
      case 2:
        obstacle.addImage("obstacle2", obstacle_2);
        break;
      case 3:
        obstacle.addImage("obstacle3", obstacle_3);
        break;
      case 4:
        obstacle.addImage("obstacle4", obstacle_4);
        break;
      case 5:
        obstacle.addImage("obstacle5", obstacle_5);
        break;
      case 6:
        obstacle.addImage("obstacle6", obstacle_6)
        break;
      default:
        break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 120;
    obstacle_group.add(obstacle);
  }
}