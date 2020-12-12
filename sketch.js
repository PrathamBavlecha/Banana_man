
var monkey , monkey1,monkey2;
var banana ,banana1, obstacle, obstacle1
var foodGrp, obstacleGrp
var score = 0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey1=            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  banana1 = loadImage("banana.png");
  obstacle1 = loadImage("obstacle.png");
  
  ground1 = loadImage("ground grass.png");
  monkey2 = loadAnimation("sprite_0.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("run", monkey1);
  monkey.scale = 0.1;
  monkey.addAnimation("ded",monkey2)
  
  ground = createSprite(300,370,600,5);
  ground.addImage("ground",ground1)
  ground.velocityX = -4
  
  obstacleGrp = new Group()
  foodGrp = new Group()
}


function draw() {
  createCanvas(600,400);
  background(255)
  
  if(gameState === PLAY){
  //moving ground
  if(ground.x<0){
    ground.x = 600
  }
  
  //scoring
  score = score + Math.round(getFrameRate()/60)
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.5
  //ground
  monkey.collide(ground)
  
  //jumping
  if(keyWentDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -13;
    }
    
  //points
    if(monkey.isTouching(foodGrp)){
      score = score + 100
      foodGrp.destroyEach()
    }
  
  spawnFood()
  spawnObstacle()
  }else if(gameState === END){
    obstacleGrp.setVelocityXEach(0)
    foodGrp.setVelocityXEach(0)
    monkey.velocityY = 0
    ground.velocityX = 0
    obstacleGrp.setLifetimeEach(-1)
    foodGrp.setLifetimeEach(-1)
  }
  
  //death
  if(monkey.isTouching(obstacleGrp)){
    gameState = END
    monkey.changeAnimation("ded",monkey2)
  }
  
  //score display
  textSize(20)
  textFont("fantasy")
  fill("black")
  text("Score :"+score,300,50)

  drawSprites()
}

function spawnFood(){
  if (frameCount%80===0){

    var banana = createSprite(600,Math.round(random(120,200)),20,20)
    banana.addImage("food",banana1)
    banana.scale = 0.1
    banana.velocityX = -4
    banana.lifetime = 150
    foodGrp.add(banana)
  }
}

function spawnObstacle(){
  if (frameCount%100===0){
  var obstacle = createSprite(600,325,10,10)
  obstacle.addImage("obs",obstacle1)
  obstacle.velocityX = -4
  obstacle.lifetime = 150
  obstacle.scale = random(0.1,0.2)
  obstacleGrp.add(obstacle)
  }
}