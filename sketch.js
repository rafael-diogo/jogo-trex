var trex, trex_running, edges,trexkill;
var groundImage,chao,solo;
var nuvem,nuvemimg
var cacto,cacto1,cacto2,cacto3,cacto4,cacto5,cacto6
var ponto=0
var grupodecactos,grupodenuvem
var jogo="começo"
var gameouverimg,gameouver
var restartimg,restart
var jump,checkpoint,die
//falar de frameRate
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
nuvemimg = loadImage("cloud.png")
cacto1 = loadImage("obstacle1.png")
cacto2 = loadImage("obstacle2.png")
cacto3 = loadImage("obstacle3.png")
cacto4 = loadImage("obstacle4.png")
cacto5 = loadImage("obstacle5.png")
cacto6 = loadImage("obstacle6.png")
trexkill = loadImage("trex_collided.png")
gameouverimg = loadImage("gameOver.png")
restartimg = loadImage("restart.png")
jump = loadSound("jump.mp3")
checkpoint = loadSound("checkpoint.mp3")
die = loadSound("die.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  chao = createSprite(width/2,height-20,400,20)
  chao.addImage ("groud",groundImage)
  solo = createSprite(width/2,height-10,width,10)
  solo.visible=false
  //criando o trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("kill",trexkill);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  grupodecactos=new Group()
  grupodenuvem=new Group()

  trex.debug=false
 trex.setCollider("circle",0,0,40)
 //trex.setCollider("rectangle",50,0,300,80,0)
 gameouver = createSprite(width/2,height/2-10)
 restart = createSprite(width/2,height/2+30)
 gameouver.addImage(gameouverimg)
 restart.addImage(restartimg)
 restart.scale=0.5
 gameouver.visible=false
 restart.visible=false
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  text("pontos "+ponto,width-100,15) 
   //registrando a posição y do trex
  console.log(trex.y)
  if(ponto>0&&ponto%100===0){
   checkpoint.play()
  }
  
 //impedir que o trex caia
  trex.collide(solo)
  if (jogo==="começo") {
    ponto=ponto+Math.round(getFrameRate()/60)
    chao.velocityX= -(3+ponto/800)
  if (chao.x<0){
    chao.x =chao.width/2;
  }
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&&trex.y>height-40){
    trex.velocityY = -10;
    jump.play()
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  nuvems()
  cactos()
  if (trex.isTouching(grupodecactos)) {
    jogo="fim"
   //trex.velocityY=-9
    die.play()
  }
  } else if(jogo==="fim"){
    chao.velocityX= 0
    trex.velocityY= 0
    trex.changeAnimation("kill",trexkill)
    grupodecactos.setVelocityXEach(0)
    grupodenuvem.setVelocityXEach(0)
    grupodecactos.setLifetimeEach(-1)
    grupodenuvem.setLifetimeEach(-1)
    gameouver.visible=true
 restart.visible=true

 if(mousePressedOver(restart)){
console.log("restartes")
reset()
 }

  }
  drawSprites();
}
function nuvems () {
  if (frameCount%90===0) {
    nuvem = createSprite (width,99)
  nuvem.addImage (nuvemimg)
  nuvem.velocityX = -3
  nuvem.scale=0.5
  nuvem.y = Math.round(random(3,height/2+50))
  nuvem.depth=trex.depth
  trex.depth=trex.depth+1
grupodenuvem.add(nuvem)
  nuvem.lifetime = 600
  }
  
}
function cactos() {

  if (frameCount %60 ===0){
  cacto = createSprite (width,height-40)
  grupodecactos.add(cacto)
  cacto.velocityX = -(6+ponto/800) 
  cacto.lifetime = 600
  cacto.scale=0.7
  cacto.depth=trex.depth
  trex.depth=trex.depth+1
  var cacto7=Math.round(random(1,6))
  switch (cacto7) {
    case 1: 
    cacto.addImage (cacto1) 
      break;
      case 2: 
      cacto.addImage (cacto2) 
        break;
        case 3: 
    cacto.addImage (cacto3) 
      break;
      case 4: 
    cacto.addImage (cacto4) 
      break;
      case 5: 
    cacto.addImage (cacto5) 
      break;
      case 6: 
    cacto.addImage (cacto6) 
      break;

    default:
      break;
  }
  }
}

function reset (){
ponto=0
jogo="começo"
gameouver.visible=false
restart.visible=false
grupodecactos.destroyEach()
grupodenuvem.destroyEach()
trex.changeAnimation("running", trex_running);
}