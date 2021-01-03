
var monkey , monkey_running;
var cloudsImg;
var timer3=0;
var touchBananaSound,dieSound,jumpSound;

var cloudGroup,obstacleGroup,bananaGroup;

var StartPage,StartPageImg,StartIcon,StartIconImg;

var restartIconImg,restartIcon;

var sun,sunImg;

var PLAY=1;
var END=0;
var gameState=END;

var monkey_stopped;

var minustimer=0;

var monkey2;

var timer=0;

var timer2=0;

 var bananaCount=0;

var ground,groundImg,soil;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  cloudsImg= loadImage("cloud.png");
  
  sunImg=loadAnimation("Sun1.png","Sun2.png")
   
  StartPageImg=loadImage("StartPage.png");
  StartIconImg=loadImage("StartIcon.png");

  restartIconImg = loadImage("restart.png")

  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stopped= loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  touchBananaSound=loadSound("touchBanana.mp3");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");
  
}



function setup() {
  createCanvas(displayWidth,displayHeight)

  sun=createSprite(350,displayHeight/2-200,20,20);
  sun.addAnimation("moving sun",sunImg);
  sun.scale=(0.3)/2;

  monkey=createSprite(100,displayHeight-130,30,30);
  monkey.addAnimation("running",monkey_running);
    monkey.scale=(0.3)/2;
    
    monkey2=createSprite(100,displayHeight-130,30,30);
    monkey2.addAnimation("stopped",monkey_stopped)
    monkey2.scale=(0.3)/2;
  monkey2.visible=false;
  
    ground=createSprite(displayWidth/2,displayHeight-100,displayWidth,10);
    ground.shapeColor="green";
   
    
    soil=createSprite(displayWidth/2,displayHeight-45,displayWidth,100);
    soil.shapeColor="brown";
  
  
  
  cloudGroup=createGroup();
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  
  StartPage=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  StartPage.addImage("start page",StartPageImg);
  StartPage.scale=1.5;
  StartPage.visible=false;
  
  StartIcon=createSprite(displayWidth/2,displayHeight/2-125,90,90);
  StartIcon.addImage("start icon",StartIconImg);
  StartIcon.scale=1.5;
  StartIcon.visible=false;

   
  restartIcon =createSprite(displayWidth/2,displayHeight/2-125,90,90);
  restartIcon.addImage("restart icon",restartIconImg);
  restartIcon.scale=1.5;
  restartIcon.visible=false;
}

function draw() {

  background("skyblue");
  
  console.log(Math.ceil(frameCount/frameRate()));
  
  camera.position.x=monkey.x+585;

  if(gameState==END && monkey.visible==true)
  {
    minustimer=World.seconds;
    StartPage.visible=true;
    StartIcon.visible=true;
    
  }
  
  if(gameState==END && mousePressedOver(StartIcon) && StartIcon.visible==true)
  {
     gameState=PLAY;
    StartPage.visible=false;
    StartIcon.visible=false;
    
  }
  if(gameState==PLAY){
   timer=World.seconds-timer3;    
  timer2=World.seconds;
  }
  
  if(gameState==PLAY){
    
    restartIcon.visible =false;
    

  SpawnClouds();
  SpawnObstacles();
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      touchBananaSound.play();
      bananaCount=bananaCount+1;
       }
    
  if(keyDown("space") && monkey.y>displayHeight-161)
  {
    monkey.velocityY=-16;  
    jumpSound.play();
  }
  monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(obstacleGroup)){
       monkey.visible=false;
      dieSound.play();
     gameState=END; 
    }
  }
  
  monkey.collide(obstacleGroup);
 monkey.collide(ground);
  
 

    if(gameState==END &&  monkey.visible==false){
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
             
      monkey2.visible=true;
      
      monkey2.x=monkey.x;
      monkey2.y=monkey.y;
      
      restartIcon.visible =true;

     bananaGroup.setLifetimeEach(-1); 
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
      monkey.velocityX=0;
      monkey2.velocityY=0;
       }
  
  Spawnbananas();
  drawSprites();
  textSize(20);
  stroke("black");
  fill("black");
  if(gameState==PLAY){


  text("Survival time: "+timer,30,displayHeight/2-200);
  text("Bananas Collected: "+bananaCount,30,(displayHeight/2-200)+40);
  }
  if (gameState==END && monkey.visible==false){
    
    text("Game Over",150,170);
    text("Your Survival Time: "+timer,120,200);
    text("Bananas You Collected: "+bananaCount,70,230);
  }

  if(mousePressedOver(restartIcon))
{
  reset();
}
}

function SpawnClouds()
{
  var cloud=createSprite(displayWidth+200,0,30,30);
  cloud.depth=monkey.depth-1;
  
  
  if (frameCount % 120 === 0) {
    
    cloud.y=Math.round(random((displayHeight/2)-200,(displayHeight/2)-100));
    cloud.addImage(cloudsImg); 
    cloud.scale = (0.3)/2;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = displayWidth-displayWidth-200;
  
 } 
  cloudGroup.add(cloud);
}


function SpawnObstacles()
{
  var obstacle=createSprite(displayWidth+200,displayHeight-125,150,150);
  obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
 obstacle.debug=false;
  obstacleGroup.add(obstacle);
 if (frameCount % 300 === 0) {

    obstacle.addImage(obstacleImage);
    obstacle.scale = (0.5)/2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = displayWidth-displayWidth-200;
   
  } 
  
}

function Spawnbananas()
{
  var banana=createSprite(displayWidth+200,displayHeight/2,30,30);
  bananaGroup.add(banana);
  banana.depth=monkey.depth-1;
  banana.y=Math.round(150,200);
 if (frameCount % 140 === 0) {
    banana.y=displayHeight-400;
    banana.addImage(bananaImage);
    banana.scale = (0.3)/2;
    banana.velocityX =-3;
    
     //assign lifetime to the variable
    banana.lifetime = displayWidth-displayWidth-200;
   
  } 
  
}

function reset()
{
  gameState=PLAY;
  monkey.visible=true;
  monkey2.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  bananaGroup.destroyEach();
  bananaCount=0;
  timer3=timer;
}