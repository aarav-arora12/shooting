var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var zombiegroup;
var score = 0,bulletimage;
var explosionSound;
var bulletgroup;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  explosionSound = loadSound("assets/explosion.mp3")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  bulletimage = loadImage("bulletfinal.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  zombiegroup = new Group();
  bulletgroup = new Group();

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 


if (zombiegroup.isTouching(player)) {
  score -= 1;
}


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 var bullet = createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.velocityX = 4
 bullet.debug = true
 
 bullet.addImage(bulletimage)
  player.addImage(shooter_shooting)
  bullet.scale = 0.1
  explosionSound.play()
  bulletgroup.add(bullet)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
for(var i =0;i<zombiegroup.length;i++){
  if(zombiegroup.get(i).isTouching(bulletgroup)){
    zombiegroup[i].destroy()
    bulletgroup.destroyEach()
    score = score+1
  }
}
createZombies()

drawSprites();
fill("red")
textSize(30)
text("SCORE "+score,displayWidth/2,100)

}

function createZombies() {
  if (frameCount%150===0){
    var zombie =createSprite(windowWidth-100,windowHeight-100,50,10)
    zombie.velocityX=-2
    zombie.y= Math.round(random(windowHeight-100,windowHeight-300))
    zombie.addImage(zombieImg)
    zombie.scale = 0.2
    zombiegroup.add(zombie)
  }
}