var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, monkey_collided;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var object,objectImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided = loadImage("sprite_8.png")
  
 
}



function setup() {
  
  createCanvas(600,400);
  
  monkey = createSprite(100,300,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale=0.1;
  
  ground = createSprite(400,330,900,10);
  ground.x = ground.width /2
  ground.shapeColor = 'black'
  
 
  
  score = 0;
 
  BananaGroup = createGroup();
  ObstacleGroup = createGroup();
}


function draw() {
  
  background(180)
  
  stroke("white");
  textSize(20)
  fill("black")
  text("Survival Time:" + score,230,50)
  
  if(gameState === PLAY){
    
    if(keyDown("space")&& monkey.y >= 200) {
    monkey.velocityY = -12;
   } 
  spawnBanana();
  spawnObstacles();
    
  monkey.velocityY = monkey.velocityY + 0.8
    
  ObstacleGroup.velocityX = -(4 + 3* score/100);
  BananaGroup.velocityX = -(4 + 8* score/100);  
  
  score = score + Math.round(getFrameRate()/60);
    
  if(BananaGroup.isTouching(monkey)){
    BananaGroup.destroyEach();
  }  
    
  if(ObstacleGroup.isTouching(monkey)){
    gameState = END
  } 
}
 
  else if(gameState === END){
 monkey.changeAnimation("collided", monkey_collided);
 BananaGroup.destroyEach(); 
 ObstacleGroup.destroyEach();
    
  
    
  stroke("white");
  textSize(20)
  fill("black")
  text("Game Over", 250,180);
  text("Press R to Restart", 230,210);
    
    
    
    if(keyDown("R")){
      reset();
    }
 
  }
  
  
  
  monkey.collide(ground);

  drawSprites();
}

function spawnBanana(){
  
  if(frameCount % 80 === 0) {
  var banana = createSprite(600,200,50,50);
  banana.y = Math.round(random(120,200));
  banana.addImage("banana",bananaImage)
  banana.scale = 0.1
  banana.velocityX = -3
  banana.lifetime = 200
  BananaGroup.add(banana);  
  }
}
 function spawnObstacles(){
   
   if(frameCount % 200 === 0){
   var obstacle = createSprite(600,300,50,50); 
   obstacle.y = Math.round(random(305,310));
   obstacle.addImage("obstacle", obstacleImage);
   obstacle.scale = 0.1
   obstacle.velocityX = -4
   obstacle.lifetime = 200 
   ObstacleGroup.add(obstacle);  
     
   }
 }

function reset(){
  
  
  
  gameState = PLAY;
  
  score = 0;
  
  monkey.changeAnimation("running", monkey_running);
  
  BananaGroup.destroyEach();
  ObstacleGroup.destroyEach();
  
  
  
}



