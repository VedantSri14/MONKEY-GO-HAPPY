var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, invisibleGround;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup
var survivalTime = 0;
var score = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 400);
  monkey = createSprite(80, 35, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(400, 380, 900, 40);
  ground.shapeColor = rgb(124, 252, 0);
  ground.velocityX = -7;

  //invisbleGround = createSprite(400, 380, 900, 40);
  // invisibleGround.visible = false;
  ///invisibleGround.shapeColor = rgb(124, 252, 0);
  // monkey.collide(invisbleGround);

}

function draw() {
  background(rgb(135, 206, 235));

  if (gameState === PLAY) {
    obstacles();
    bananas();

    survivalTime = survivalTime + Math.round(getFrameRate() / 60);



    fill(rgb(160, 82, 45));
    textSize(25);
    text("SURVIVAL TIME: " + survivalTime, 25, 40)
    text("BANANAS COLLECTED: " + score, 25, 75)

    if (ground.x > 0) {
      ground.x = ground.width / 2;
    }
    console.log(ground.x);

    if (keyDown("space") && monkey.y >= 305) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    bananaGroup = new Group();
    obstacleGroup = new Group();

    if (monkey.isTouching(bananaGroup)) {
      score = score + 1;
      bananaGroup.destroyEach();

      if (monkey.isTouching(obstacleGroup)) {
        gameState = END;

      }

    }
    if (gameState === END) {
      ground.velocityX = 0;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      fill("red")
      textSize(30);
      text("OOPS, THE GAME IS OVER!", 100, 170);
      fill("black");
      textSize(20);
      text("PRESS 'R' TO PLAY AGAIN", 170, 200);

      if (keyDown("r")) {
        bananaGroup.destroyEach();
        obstacleGroup.destroyEach();
        monkey.changeAnimation("monkey", monkey_running);
        score = 0;
        survivalTime = 0;
        gameState = PLAY;
      }

    }

    drawSprites();
  }
}

function bananas() {
  if (frameCount % 80 === 0) {

    banana = createSprite(600, Math.round(random(200, 300)), 10, 10);
    banana.addAnimation("banana", bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.lifetime = 120;
    bananaGroup.add(banana);

  }
}

function obstacles() {
  if (frameCount % 300 === 0) {

    obstacle = createSprite(600, 340, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.12;
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
  }
}