var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleGroup, invisibleBlock;
var gameState = "play"
var spookySound


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  
  ghost.scale= 0.3

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleGroup = new Group()
}

function draw() {
  background(200);
  if(gameState == "play"){
  if(tower.y > 400){
      tower.y = 300
    }
    
 
    
    if(keyDown("space")){
      ghost.velocityY = -4;
      
    }
    ghost.velocityY = ghost.velocityY + 0.5
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 2

    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 2
    }

    spawndoors();

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }

    if(invisibleGroup.isTouching(ghost)|| ghost.y > 600){
      ghost.destroy()
      gameState = "end"
      
    }
    drawSprites();
  }

  if(gameState == "end"){
    textSize(50)
    fill("yellow")
    text("GAME OVER LOSER", 60,300)

    
  }
}

function spawndoors(){
  if(frameCount % 250 == 0){
    door = createSprite(346, -50);
  climber = createSprite(346, 0);
  invisibleBlock = createSprite(346, 10)
 door.x = Math.round(random(100, 500))
  climber.x= door.x
 invisibleBlock.x = door.x
 invisibleBlock.width = climber.width
 invisibleBlock.height = 2
 invisibleBlock.visible = false
 invisibleBlock.lifetime = 700
 invisibleBlock.velocityY = 1
 invisibleGroup.add(invisibleBlock)

  door.addImage("door", doorImg )
  climber.addImage("climber", climberImg)

  door.velocityY = 1 
  climber.velocityY = 1
  door.lifetime = 700
  climber.lifetime = 700
  doorsGroup.add(door)
  climbersGroup.add(climber)
  ghost.depth = door.depth;
  ghost.depth += 1
  }
}

