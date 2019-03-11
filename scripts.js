
var player,floor,floor2,floor3,floor4,floor5,floor6,water,score,bg,pauser;

var startGame = () => {
  gameArea.start();
  pauser = new component('screen','rgba(255,0,0,0.5)',gameArea.width,gameArea.height,0,0);
  bg = new component('bg','img/bg.png',2133,gameArea.height,0,0);
  player = new component('image','img/player/front.png',90,126,30,-126);
  floor =  new component('floor','transparent',710,10,134,311);
  floor2 = new component('floor','transparent',267,10,844,355);
  floor3 = new component('floor','transparent',176,10,1200,355);
  floor4 = new component('floor','transparent',176,10,1466,355);
  floor5 = new component('floor','transparent',176,10,1734,355);
  floor6 = new component('floor','transparent',176,10,2000,355);
  water = new component('bg','img/water.png',3168,44,0,356);
  score = new component('text','white','20px','Arial',40,50);
}

var gameArea = {
  width  : 600,
  height : 400,
  canvas : document.createElement('canvas'),
  start  : function() {
    this.dpi = 2;
    this.interval = setInterval(updateGameArea,10);
    this.canvas.style.height = this.height + "px";
    this.canvas.style.width = this.width + "px";
    this.canvas.height = this.height*this.dpi;
    this.canvas.width = this.width*this.dpi;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.dpi,this.dpi);
    this.paused = false;
    this.active = true;
    this.frame = 0;
    document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    window.addEventListener('keydown',function(e){
      e.preventDefault();
      gameArea.keys = (gameArea.keys || []);
      gameArea.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup',function(e){
      gameArea.keys[e.keyCode] = (e.type == "keydown");
    })
  },
  clear : function() {
    this.ctx.clearRect(0,0,this.width,this.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

function component(type,color,width,height,x,y) {

  this.height = height;
  this.width = width;
  this.type = type;
  this.x = x;
  this.y = y;

  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.1;
  this.gravitySpeed = 0;
  this.bounce = 0.2;
  this.energy = 2;

  if(type == 'image' || type == 'bg'){
    this.image = new Image();
    this.image.src = color;
  }

  this.update = () => {

    ctx = gameArea.ctx;

    if(type == 'text'){
      ctx.font = this.width + ' ' + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text,this.x,this.y);
    } else if(type == 'image' || type == 'bg'){
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      if(type == 'bg'){
        ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height);
      }
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x,this.y,this.width,this.height);
    }
  },

  this.move = () => {

    var lake = gameArea.height - (player.height*0.6),
        boing  = this.gravitySpeed * this.bounce;
        this.y += this.speedY + this.gravitySpeed;
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;

    if(this.y > lake) {
      this.y = lake;
      this.gravitySpeed =- boing;
      player.energy = 1;

      setTimeout(function(){
        gameArea.paused = true;
      }, 1000);
    }
  },

  this.landOn = (other) => {

    var left = this.x,
        right = this.x + (this.width),
        top = this.y + (this.height),
        bottom = this.y + (this.height),
        otherLeft = other.x + (player.width*0.5),
        otherRight = other.x + (other.width - (player.width*0.5)),
        otherTop = other.y,
        otherBottom = other.y + other.height,
        land = true;

    if((bottom < otherTop) ||
       (top > otherBottom) ||
       (right < otherLeft) ||
       (left > otherRight)) { land = false; }
    return land;
  }

  this.clear = () => {
    this.speedX = 0;
    this.speedY = 0;
  }
}

var updateGameArea = () => {

    gameArea.clear();
    gameArea.frame += 1;
    water.update();
    bg.update();
    floor.update();
    floor2.update();
    floor3.update();
    floor4.update();
    floor5.update();
    floor6.update();
    player.move();
    player.update();
    player.clear();
    score.update();

    if(!gameArea.paused) {
      score.text = 'Score: ' + Math.round(gameArea.frame*0.03);
      if(gameArea.frame < ((bg.width - gameArea.width)*2)) {
        bg.x -= 0.5;
        floor.x -= 0.5;
        floor2.x -= 0.5;
        floor3.x -= 0.5;
        floor4.x -= 0.5;
        floor5.x -= 0.5;
        floor6.x -= 0.5;
        player.x -= 0.5;
      }
    } else {
      pauser.update();
    }

    if(player.landOn(floor)){
      var ground = floor.y - player.height;
      if(player.y > ground){
        player.gravitySpeed = 0;
        player.y = ground;
      }
    }

    if(player.landOn(floor2)){
      var ground = floor2.y - player.height;
      if(player.y > ground){
        player.gravitySpeed = 0;
        player.y = ground;
      }
    }

    if(player.landOn(floor3)){
      var ground = floor3.y - player.height;
      if(player.y > ground){
        player.gravitySpeed = 0;
        player.y = ground;
      }
    }

    if(player.landOn(floor4)){
      var ground = floor4.y - player.height;
      if(player.y > ground){
        player.gravitySpeed = 0;
        player.y = ground;
      }
    }

    if(player.landOn(floor5)){
      var ground = floor5.y - player.height;
      if(player.y > ground){
        player.gravitySpeed = 0;
        player.y = ground;
      }
    }

    if(player.landOn(floor6)){
      var ground = floor6.y - player.height;
      if(player.y > ground){
        player.gravitySpeed = 0;
        player.y = ground;
      }
    }

    if(gameArea.keys && gameArea.keys[38]){ move('jump'); }
    if(gameArea.keys && gameArea.keys[37]){ move('left'); }
    if(gameArea.keys && gameArea.keys[39]){ move('right'); }
}

var move = (dir) => {

  if(dir == 'jump'){
    player.speedY = -player.energy;
    player.gravitySpeed = 0;

    setTimeout(function(){
      player.speedY = player.energy/2;
    }, player.energy*200);
  }

  if(dir == 'left'){
    player.speedX = -1;
    legs('left');
  }

  if(dir == 'right'){
    player.speedX = 1.5;
    legs('right');
  }

  window.addEventListener('keyup', () => {
    player.image.src = 'img/player/front.png';
  });
}

var legs = (dir) => {
  var steps = Math.round(gameArea.frame*0.1);

  if(dir == 'right'){
    if(steps % 2 == 0) {
      player.image.src = 'img/player/walk.png';
    } else {
      player.image.src = 'img/player/step.png';
    }
  } else if(dir == 'left'){
    if(steps % 2 == 0) {
      player.image.src = 'img/player/walk-left.png';
    } else {
      player.image.src = 'img/player/step-left.png';
    }
  }
}
