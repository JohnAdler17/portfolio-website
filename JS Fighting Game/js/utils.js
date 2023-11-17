
//function that tests whether the rectangular hitboxes make a collision (args are player/enemy objects)
//rectangle 1 is the fighter object that is doing the hitting, rectangle2 is the enemy fighter object that is taking the hit
//to generalize for different attackboxes, make the fighter object attack box that is doing the hitting an argument (ex. passing player, enemy, player._attackBox (set as a attackBox argument here))
function rectangularCollision({rectangle1, rectangle2}) {
  return (rectangle1._attackBox._position.x + rectangle1._attackBox._width >= rectangle2._position.x
      && rectangle1._attackBox._position.x <= rectangle2._position.x + rectangle2._width
      && rectangle1._attackBox._position.y + rectangle1._attackBox._height >= rectangle2._position.y
      && rectangle1._attackBox._position.y <= rectangle2._position.y + rectangle2._height)
}

function clickButtonCollision({x, y, button}) {
  return (x > button._position.x
    && x < button._position.x + button._width
    && y > button._position.y
    && y < button._position.y + button._height)
}

function determineWinner({player, enemy, timerID}) {
  clearTimeout(timerID); //stops the timer when someone loses
  if (!gameSettings.gameOverToggle.toggle) {
    document.querySelector('#displayText').style.display = 'flex';
  }
  document.querySelector('#displayText').style.fontSize = '50px';
  if (player._health === enemy._health) {
    //timeout
    document.querySelector('#displayText').innerHTML = 'Tie';
    setTimeout(() => {
      gameSettings.gameOverToggle.toggle = true;
    }, 5000)
  }
  else if (player._health > enemy._health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
  }
  else if (enemy._health > player._health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
  }
}

//
let timer = 61;
let timerID;
function decreaseTimer() {
  document.querySelector('#timer').style.fontSize = '50px';
  if (timer > 0) {
    timerID = setTimeout(decreaseTimer, 1000) //time in milliseconds
    timer--;
    document.querySelector('#timer').innerHTML = timer;
  }
  if (timer === 0) {
    determineWinner({player, enemy, timerID});
    setTimeout(() => {
      gameSettings.gameOverToggle.toggle = true;
    }, 5000)
  }
}

function changePlayer({character, target}) {

  character.imageSrc = target.imageSrc;
  //make a new Fighter object called Vic and one called FoxFace and then copy elements from those objects to here
  character.framesMax = target.framesMax;
  character.scale = target.scale;
  character.offset.x = target.offset.x;
  character.offset.y = target.offset.y;
  character.sprites = target.sprites;
  character.framesHold = target.framesHold;
  //copy specific attackBox attributes so that one player's attack boxes aren't the other player's

  character._attackBox._width = target._attackBox._width;
  character._attackBox._height = target._attackBox._height;
  character._attackBox._offset = target._attackBox._offset;
  character._attackBox._hitframeStart = target._attackBox._hitframeStart;
  character._attackBox._hitframeEnd = target._attackBox._hitframeEnd;
  character._attackBox._damage = target._attackBox._damage;
  character._attackBox._knockbackSpeedY = target._attackBox._knockbackSpeedY;
  character._attackBox._knockbackSpeedX = target._attackBox._knockbackSpeedX;
  character._attackBox._hitstunTime = target._attackBox._hitstunTime;
  character._attackBox._attackLagTime = target._attackBox._attackLagTime;

  //character._attackBox = target._attackBox;
  character._width = target._width;
  character._height = target._height;
  character.crouchHeight = target.crouchHeight;
  //Object.assign(character, target)
}
