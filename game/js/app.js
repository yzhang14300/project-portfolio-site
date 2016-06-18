var numCols=$("#playcol").val();
var numRows=$("#playrow").val();
var score=0;
var heart=3;
var blueGem=0;
var greenGem=0;
var orangeGem=0;
var star=10;
var enemyKilled=0;

//this following code spawn the Hearts
var Heart = function() {
  this.xGrid = -10;
  this.yGrid = -10;
  this.x = -1000;
  this.y = -1000;
  this.bSpawn = false;
  this.sprite = 'images/Heart.png';
};
Heart.prototype.spawn = function() {
  if(this.bSpawn === true) return;
  else{
    this.xGrid=parseInt(Math.random()*numCols);
    this.yGrid=parseInt(Math.random()*(numRows-1)+1);
    this.bSpawn=true;
  }
}
Heart.prototype.update = function () {
  if(player.xGrid===this.xGrid && player.yGrid===this.yGrid){
    this.xGrid=-1;
    this.yGrid=-1;
    this.bSpawn=false;
  }
  this.x=this.xGrid*101;
  this.y=this.yGrid*83;
}
Heart.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//var newHeart=new Heart();


//the following code spawn the Gems
var Star = function(){
  Heart.call(this);
  this.sprite = 'images/Star.png';
}
Star.prototype = Object.create(Heart.prototype);
Star.prototype.update = function(){
  Heart.prototype.update.call(this);
  this.y=this.yGrid*83-13;
}
//var newStar = new Star();

//the following code spawn the Rocks
var Rock = function(){
  Heart.call(this);
  this.sprite = 'images/Rock.png';
}
Rock.prototype = Object.create(Heart.prototype);
Rock.prototype.update = function(){
  this.x=this.xGrid*101;
  this.y=this.yGrid*83-23;
  this.bSpawn=false;
}
var allRocks=[];
var createRock = function(){
  for(var loop=0;loop<numRows-3;loop++){
    var tmpRock = new Rock();
    allRocks.push(tmpRock);
    tmpRock.spawn();
  }
};
//createRock();



//the following code spawn the key
var Key = function(){
  Heart.call(this);
  this.sprite = 'images/Key.png';
}
Key.prototype = Object.create(Heart.prototype);
Key.prototype.update = function(){
  Heart.prototype.update.call(this);
  this.y=this.yGrid*83-23;
}
//var newKey = new Key();

//the following code spawn the Gems
var Gem = function(){
  Heart.call(this);
  this.sprite = 'images/Gem Blue.png';
}
Gem.prototype = Object.create(Heart.prototype);
Gem.prototype.update = function(){
  Heart.prototype.update.call(this);
  this.y=this.yGrid*83-23;
}
Gem.prototype.spawn = function(){
  if(this.bSpawn===false){
    var randnum=parseInt(Math.random()*3);
    if(randnum===0) this.sprite='images/Gem Blue.png';
    else if(randnum===1) this.sprite='images/Gem Green.png';
    else if(randnum===2) this.sprite='images/Gem Orange.png';
  }
  Heart.prototype.spawn.call(this);
}
//var newGem = new Gem();

// Enemies our player must avoid
var Enemy = function() {
  this.speed = 100;
  this.restoreSpeed = 0;
  this.row = 0;
  this.x = 0;
  this.y = -23;
  this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
  this.x += dt*this.speed;
  if(this.x>numCols*101) this.x=-110;
};
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies=[];
var createEnemy = function(){
  for(var loop=0;loop<numRows-3;loop++){
    var tmpEnemy=new Enemy();
    tmpEnemy.y+=(loop+1)*83;
    tmpEnemy.row=loop+1;
    tmpEnemy.speed*=(1+3*Math.random());
    tmpEnemy.restoreSpeed=tmpEnemy.speed;
    allEnemies.push(tmpEnemy);
  }
};
//createEnemy();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var defaultplayersprite = 'images/char-boy.png';
var Player = function(){
  Enemy.call(this);
  this.xGrid=parseInt(numCols/2);
  this.yGrid=numRows-1;
  this.x = this.xGrid*101;
  this.y = this.yGrid*83-23;
  this.sprite = defaultplayersprite;
};
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.render = function(dt){
  if(star>0){
    ctx.drawImage(Resources.get('images/Selector.png'), this.x, this.y-13);
  }
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.update = function(dt){
  this.x = this.xGrid*101;
  this.y = this.yGrid*83-23;
};
Player.prototype.handleInput = function(keyCode){
  var lastxGrid=this.xGrid;
  var lastyGrid=this.yGrid;
  if(keyCode=='left'){
    if(this.xGrid>0) this.xGrid-=1;
  }else if(keyCode=='right'){
    if(this.xGrid<numCols-1) this.xGrid+=1;
  }else if(keyCode=='up'){
    if(this.yGrid==1){
      this.yGrid=numRows-1;
      this.xGrid=parseInt(numCols/2);
      score++;
      $("#score").text(score);
      return;
    }
    else this.yGrid-=1;
  }else if(keyCode=='down'){
    if(this.yGrid<numRows-1) this.yGrid+=1;
  }
  //check if the player hit the Rock
  for(var loop=0;loop<allRocks.length;loop++){
    if(allRocks[loop].xGrid===this.xGrid && allRocks[loop].yGrid===this.yGrid){
      this.xGrid=lastxGrid;
      this.yGrid=lastyGrid;
      return;
    }
  }
}
//var player=new Player();

//check if the player eat any bonus
function checkBonus(){
  if(player.xGrid===newKey.xGrid && player.yGrid===newKey.yGrid){
    reset("Congratulations! You Win the Game!");
  }
  if(player.xGrid===newHeart.xGrid && player.yGrid===newHeart.yGrid){
    heart++;
  }
  if(player.xGrid===newGem.xGrid && player.yGrid===newGem.yGrid){
    if(newGem.sprite==='images/Gem Blue.png'){
      blueGem++;
    }else if(newGem.sprite==='images/Gem Green.png'){
      greenGem++;
    }else{
      orangeGem++;
    }
  }
  if(player.xGrid===newStar.xGrid && player.yGrid===newStar.yGrid){
    star++;
  }
  if(score>=2 && newGem.bSpawn===false){
    score-=2;
    newGem.spawn();
  }
  if(blueGem>=1 && greenGem>=1 && orangeGem>=1 && newStar.bSpawn===false){
    newStar.spawn();
    blueGem-=1;
    greenGem-=1;
    orangeGem-=1;
  }
  $("#score").text(score);
  $("#star").text(star);
  $("#heart").text(heart);
  $("#blueGem").text(blueGem);
  $("#greenGem").text(greenGem);
  $("#orangeGem").text(orangeGem);
}

function checkCollisions(){
  //check if the bugs hit the rock
  allEnemies.forEach( function(enemy){
    var bBlock=false;
    for(var loop=0; loop<allRocks.length; loop++){
      var row = allRocks[loop].yGrid;
      if(row === enemy.row){
        if(enemy.x<allRocks[loop].x && enemy.x>allRocks[loop].x-71){
          enemy.speed = 0;
          bBlock=true;
          break;
        }
      }
    }
    if(bBlock===false) enemy.speed=enemy.restoreSpeed;
  });

  //check if the player killed the bug
  if(player.yGrid>=1 && player.yGrid<=numRows-3){
    if( allEnemies[player.yGrid-1].x<player.x+71 && allEnemies[player.yGrid-1].x>player.x-71 ){
      if(star>0){
        allEnemies[player.yGrid-1].speed=0;
        allEnemies[player.yGrid-1].restoreSpeed=0;
        allEnemies[player.yGrid-1].x=-100;
        allEnemies[player.yGrid-1].y=-100;
        enemyKilled++;
        star--;
        $("#star").text(star);
      }else{
        player.yGrid=numRows-1;
        player.xGrid=parseInt(numCols/2);
        heart-=3;
        if(heart<=0){
          reset("You died! Try Again!");
        }else{
          $("#heart").text(heart);
        }
      }
    }
  }
  if(enemyKilled===numRows-3){
    newKey.spawn();
  }
};

reset("Let's Play!");
setInterval(function(){newHeart.spawn()}, 1000*1);//(Math.random()*10+1));
var spawnRepeat=0;
setInterval(function(){
  spawnRepeat=spawnRepeat%allRocks.length;
  allRocks[spawnRepeat].spawn();
  spawnRepeat++;
}, 1000*2.5);//(Math.random()*10+1));

function reset(message){
  numCols=$("#playcol").val();
  numRows=$("#playrow").val();
  canvas.width = numCols * 101;
  canvas.height = numRows * 101;

  allEnemies = [];
  allRocks = [];
  score=0;
  heart=3;
  blueGem=0;
  greenGem=0;
  orangeGem=0;
  star=0;
  enemyKilled=0;
  $("#score").text(score);
  $("#heart").text(heart);
  $("#blueGem").text(blueGem);
  $("#greenGem").text(greenGem);
  $("#orangeGem").text(orangeGem);
  $("#score").text(star);

  player=new Player();
  newGem=new Gem();
  newHeart=new Heart();
  newStar=new Star();
  newKey=new Key();
  createEnemy();
  createRock();

  $("#resetdialog").attr("open",true);
  $("#resetmessage").text(message);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

$('#changegame').click( function(e){
    numCols=$("#playcol").val();
    numRows=$("#playrow").val();
    canvas.width = numCols * 101;
    canvas.height = numRows * 101;
    reset("Game Reset!");
    e.stopPropagation();
});

$('#changerole').click( function(e){
    $("#chooserole").attr("open",true);
    e.stopPropagation();
});

$("body").click( function(){
  $("#chooserole").attr("open",false);
  $("#resetdialog").attr("open",false);
});

$("#role1").click( function(){
  defaultplayersprite=$("#role1").attr("src");
  player.sprite = defaultplayersprite;
  $("#chooserole").attr("open",false);
  $("#playerpic").attr("src","images/char-boy.png")
});
$("#role2").click( function(){
  defaultplayersprite=$("#role2").attr("src");
  player.sprite = defaultplayersprite;
  $("#chooserole").attr("open",false);
  $("#playerpic").attr("src","images/char-cat-girl.png")
});
$("#role3").click( function(){
  defaultplayersprite=$("#role3").attr("src");
  player.sprite = defaultplayersprite;
  $("#chooserole").attr("open",false);
  $("#playerpic").attr("src","images/char-horn-girl.png")
});
$("#role4").click( function(){
  defaultplayersprite=$("#role4").attr("src");
  player.sprite = defaultplayersprite;
  $("#chooserole").attr("open",false);
  $("#playerpic").attr("src","images/char-pink-girl.png")
});
$("#role5").click( function(){
  defaultplayersprite=$("#role5").attr("src");
  player.sprite = defaultplayersprite;
  $("#chooserole").attr("open",false);
  $("#playerpic").attr("src","images/char-princess-girl.png")
});
