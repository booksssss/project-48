var score=0;
var life = 3;
var gameState = "play";

var dessertGroup;
function preload()
{
  bg_img = loadImage('assets/kitchen.jpeg');
  cupcake_img = loadImage('assets/cupcake.png')
  cakepop_img = loadImage('assets/cake pop.png')
  cake_img = loadImage('assets/cake slice.png')
  maceron_img= loadImage('assets/maceron.png')

  food = loadImage('assets/melon.png');
  rabbit = loadImage('assets/Rabbit-01.png');;
  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png");
  eat = loadAnimation("assets/eat_0.png" , "assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png");
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png");
 
  bg_img2 = loadImage("assets/bg_plain.png");
  mutebutton = loadImage("assets/cut_button.png")
  cake_pop = loadImage("assets/cake_pop.png")
  cookie_img = loadImage("assets/cookiee.png")
 dog = loadAnimation("assets/dog_1.png","assets/dog_2.png");
 dogSad = loadAnimation("assets/dog_depressed.png");

 gameover_Img = loadImage("assets/game_over.png");


  lucky_img = loadImage("assets/lucky_img.png")

  
}

function setup() {


  
  var isMObile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMObile)
{
  canW = displayWidth;
  canH = displayHeight
}  
else{
  canW = windowWidth; 
    canH = windowHeight; 
}
createCanvas(windowWidth,windowHeight);
  frameRate(80);

  dessertGroup = new Group();

  lucky = createSprite(width/2,height-60)
  lucky.addAnimation('dog1',dog);
  lucky.scale =0.3;
  lucky.addAnimation("sad dog", dogSad);
  
position =  lucky.y;

  
  invisible_ground = createSprite(width/2,height-10,canW,20)
  invisible_ground.visible=false;
  

  gameover = createSprite(width/2,height/2,20,20);
  gameover.addImage('gameover',gameover_Img)
  gameover.visible = false;
  //invisible_ground.visible=false;
  


  lucky.collide(invisible_ground)
  
 

}



function draw() 
{
  background(51);
  image(bg_img,0,0  ,canW,canH);
  
  lucky.debug = false;
  lucky.setCollider("circle",45,0,150);


if(gameState == 'play'){
  if(dessertGroup.collide(invisible_ground)){
    life = life - 1;
    dessertGroup.destroyEach();
  
    console.log(lucky.y)
    if(life ==0){
      gameover.visible = true;
    }
    if (life == 0){
      gameState = "end"
      
    }
   }
  
    
    
  
    drop();
  console.log(dessertGroup.length)
      for (var i = 0; i < dessertGroup.length; i++) {
          if (dessertGroup.get(i).isTouching(lucky)) {
              dessertGroup.get(i).destroy();
              
  
              score =score+1;
            
              console.log("Scores : ",score)
  
          }
              
        }
  
        if (keyDown("LEFT")){
          lucky.x=lucky.x-5
        }
  
        if (keyDown("RIGHT")){
          lucky.x=lucky.x+5
        }
}
else if(gameState == "end"){
      textSize(20)
      fill("black")
      text(30);
      stroke("red");
      strokeWeight(20);
      //text("Loser",width/2,50);
      dessertGroup.setVelocityEach(0,0);
      lucky.changeAnimation("sad dog", dogSad);
      lucky.scale=1;

      lucky.y = position-300;
      console.log(lucky.y)
      
    }
    fill("black");
    textSize(30);
    stroke("pink");
    strokeWeight(30);
    text("Score: "+score,200,50);

    fill("black")
textSize(30);
stroke("white")
strokeWeight(30)
  text("Life :"+life,200,150);
   
    drawSprites();

        }



function drop(){
  if (frameCount % 120 === 0) {
    desserts = createSprite(random(100, 1000), 0, 100, 100);
    desserts.velocityY = 6;
    var rand = Math.round(random(1,5));
    switch(rand){
        case 1: desserts.addImage("cake", cake_img);
        desserts.scale = 0.4;
        break;
        case 2: desserts.addImage("cakepop", cake_pop);
        desserts.scale = 0.3;
        break;
        case 3: desserts.addImage("cupcake", cupcake_img);
        desserts.scale = 0.1;
        break;
        case 4: desserts.addImage("maceron", maceron_img);
        desserts.scale = 0.3;
        break;
        case 5: desserts.addImage("cookie", cookie_img);
        desserts.scale = 0.4;
        break;
        default:
          break;
    }
    dessertGroup.add(desserts);
}
}

