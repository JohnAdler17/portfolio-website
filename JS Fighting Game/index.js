const canvas = document.querySelector('canvas'); //stores the canvas object from the HTML file into a const

//next make the canvas context which draws sprites on our canvas
//you want to get 2d context for a 2d game, but you can also do 3d context for a 3d game
const c = canvas.getContext('2d');

//this sets the game to a 16:9 ratio
canvas.width = 1024;
canvas.height = 576;

//fills the canvas with a black rectangle?
c.fillRect(0, 0, canvas.width, canvas.height);

//go to character select screen before fight starts (change screen order), then change player1 (player) stats/sprites to location of first click, then enemy stats/sprites to location of second click
//make animated button sprites for each fighter
//could maybe use CSS/HTML mouse hover feature to display fighters on select screen

//start screen objects
const startBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './Assets/background1.png',
  scale: 1.6
})

const characterSelectBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './Assets/characterselectbackground.png',
  scale: 1.6
})

const vicSelectButton = new Sprite({
  position: {
    x: 100,
    y: 400
  },
  imageSrc: './Assets/vic-select-button.png',
  width: 100,
  height: 100
})

const foxfaceSelectButton = new Sprite({
  position: {
    x: 250,
    y: 400
  },
  imageSrc: './Assets/foxface-select-button.png',
  width: 100,
  height: 100
})

const fightButton = new Sprite({
  position: {
    x: 50,
    y: 425
  },
  imageSrc: './Assets/fight-button1.png',
  width: 275,
  height: 75
})

const controlsButton = new Sprite({
  position: {
    x: 395,
    y: 425
  },
  imageSrc: './Assets/controls-button1.png',
  width: 275,
  height: 75
})

const xButton = new Sprite({
  position: {
    x: 902,
    y: 28
  },
  imageSrc: './Assets/x-button1.png',
  width: 90,
  height: 50
})
//creating the player and enemy

const gravity = 0.4;

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './Assets/finalbackground.png'
})

const shop = new Sprite({
  position: {
    x: 650,
    y: 150
  },
  imageSrc: './Assets/shop_anim.png',
  scale: 2.75,
  framesMax: 6
})

const vic = new Fighter({
  position: {x: 0, y: 0},
  velocity: {x: 0, y: 0},
  imageSrc: './Assets/Martial Hero/Sprites/Idle.png',
  framesMax: 8,
  scale: 1.4,
  offset: {x: 137, y: 85},
  sprites: {
    idle: {
      imageSrc: './Assets/Vic/idle-spritesheet.png',
      framesMax: 4
    },
    runright: {
      imageSrc: './Assets/Vic/walk-right-spritesheet.png',
      framesMax: 6
    },
    runleft: {
      imageSrc: './Assets/Vic/walk-left-spritesheet.png',
      framesMax: 6
    },
    jump: {
      imageSrc: './Assets/Vic/jump-right.png',
      framesMax: 1
    },
    jumpRV: {
      imageSrc: './Assets/Vic/jump-left.png',
      framesMax: 1
    },
    fall: {
      imageSrc: './Assets/Vic/fall-right.png',
      framesMax: 1
    },
    fallRV: {
      imageSrc: './Assets/Vic/fall-left.png',
      framesMax: 1
    },
    attack1: {
      imageSrc: './Assets/Vic/punch-right-spritesheet.png',
      framesMax: 5
    },
    attack1RV: {
      imageSrc: './Assets/Vic/punch-left-spritesheet.png',
      framesMax: 5
    },
    takeHit: {
      imageSrc: './Assets/Vic/takehit-right.png',
      framesMax: 8
    },
    takeHitLeft: {
      imageSrc: './Assets/Vic/takehit-left.png',
      framesMax: 8
    },
    death: {
      imageSrc: './Assets/Martial Hero/Sprites/Death.png',
      framesMax: 6
    },
    deathLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/DeathLeft.png',
      framesMax: 7
    },
    crouchleftHold: {
      imageSrc: './Assets/Vic/crouch-left-hold.png',
      framesMax: 1
    },
    crouchrightHold: {
      imageSrc: './Assets/Vic/crouch-right-hold.png',
      framesMax: 1
    },
    idleLeft: {
      imageSrc: './Assets/Vic/idle-left-spritesheet.png',
      framesMax: 4
    }
  },
  framesHold: 6,
  attackBox: {
    offset: {
      x: 85,
      y: 40
    },
    width: 70,
    height: 25,
    hitframeStart: 1,
    hitframeEnd: 2,
    damage: 20,
    knockbackSpeedX: 4,
    knockbackSpeedY: 10,
    attackLagTime: 200,
    hitstunTime: 350
  },
  width: 80,
  height: 200
});

const foxface = new Fighter({
  position: {x: 700, y: 200}, //by default, player starts at pos 0,0
  velocity: {x: 0, y: 0}, //by default, player starts with no velocity
  color: 'blue',
  //offset: {x: -50, y: 0},
  imageSrc: './Assets/Martial Hero 2/Sprites/IdleRight.png',
  framesMax: 4,
  scale: 2.5,
  offset: {x: 215, y: 167},
  sprites: {
    idle: {
      imageSrc: './Assets/Martial Hero 2/Sprites/IdleRight.png',
      framesMax: 4
    },
    idleLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/IdleLeft.png',
      framesMax: 4
    },
    runright: {
      imageSrc: './Assets/Martial Hero 2/Sprites/RunRight.png',
      framesMax: 8
    },
    runleft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/RunLeft.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './Assets/Martial Hero 2/Sprites/JumpRight.png',
      framesMax: 2
    },
    jumpRV: {
      imageSrc: './Assets/Martial Hero 2/Sprites/JumpLeft.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './Assets/Martial Hero 2/Sprites/FallRight.png',
      framesMax: 2
    },
    fallRV: {
      imageSrc: './Assets/Martial Hero 2/Sprites/FallLeft.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Attack1Right.png',
      framesMax: 4
    },
    attack1RV: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Attack1Left.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Take hit Right.png',
      framesMax: 3
    },
    takeHitLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Take hit Left.png',
      framesMax: 3
    },
    death: {
      imageSrc: './Assets/Martial Hero 2/Sprites/DeathRight.png',
      framesMax: 7
    },
    deathLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/DeathLeft.png',
      framesMax: 7
    },
    crouchleftHold: {
      imageSrc: './Assets/Martial Hero 2/Sprites/HoldCrouchLeft.png',
      framesMax: 1
    },
    crouchrightHold: {
      imageSrc: './Assets/Martial Hero 2/Sprites/HoldCrouchRight.png',
      framesMax: 1
    }
  },
  framesHold: 8,
  attackBox: {
    offset: {
      x: 50,
      y: 0
    },
    width: 150,
    height: 30,
    hitframeStart: 2,
    hitframeEnd: 2,
    damage: 15,
    knockbackSpeedX: 4,
    knockbackSpeedY: 10,
    attackLagTime: 500,
    hitstunTime: 500
  },
  width: 50,
  height: 150
});

//creates an instance of the player from the Sprite class with a starting x pos of 0 and y pos of 0
const player = new Fighter({
  position: {x: 200, y: 200}, //by default, player starts at pos 0,0
  velocity: {x: 0, y: 0}, //by default, player starts with no velocity
  imageSrc: './Assets/Martial Hero/Sprites/Idle.png',
  framesMax: 8,
  scale: 1.4,
  offset: {x: 137, y: 85},
  sprites: {
    idle: {
      imageSrc: './Assets/Vic/idle-spritesheet.png',
      framesMax: 4
    },
    runright: {
      imageSrc: './Assets/Vic/walk-right-spritesheet.png',
      framesMax: 6
    },
    runleft: {
      imageSrc: './Assets/Vic/walk-left-spritesheet.png',
      framesMax: 6
    },
    jump: {
      imageSrc: './Assets/Vic/jump-right.png',
      framesMax: 1
    },
    jumpRV: {
      imageSrc: './Assets/Vic/jump-right.png',
      framesMax: 1
    },
    fall: {
      imageSrc: './Assets/Vic/fall-right.png',
      framesMax: 1
    },
    fallRV: {
      imageSrc: './Assets/Vic/fall-right.png',
      framesMax: 1
    },
    attack1: {
      imageSrc: './Assets/Vic/punch-right-spritesheet.png',
      framesMax: 5
    },
    attack1RV: {
      imageSrc: './Assets/Vic/punch-left-spritesheet.png',
      framesMax: 5
    },
    takeHit: {
      imageSrc: './Assets/Vic/takehit-right.png',
      framesMax: 8
    },
    takeHitLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Take hit Left.png',
      framesMax: 3
    },
    death: {
      imageSrc: './Assets/Martial Hero/Sprites/Death.png',
      framesMax: 6
    },
    deathLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/DeathLeft.png',
      framesMax: 7
    },
    crouchleftHold: {
      imageSrc: './Assets/Vic/crouch-left-Hold.png',
      framesMax: 1
    },
    crouchrightHold: {
      imageSrc: './Assets/Vic/crouch-right-Hold.png',
      framesMax: 1
    },
    idleLeft: {
      imageSrc: './Assets/Vic/idle-left-spritesheet.png',
      framesMax: 4
    }
  },
  framesHold: 6,
  attackBox: {
    offset: {
      x: 80,
      y: 40
    },
    width: 70,
    height: 25,
    hitframeStart: 1,
    hitframeEnd: 2,
    damage: 20,
    knockbackSpeedX: 4,
    knockbackSpeedY: 10,
    attackLagTime: 200,
    hitstunTime: 500
  },
  width: 80,
  height: 200
});
//console.log(player._position);
//player.draw();

const enemy = new Fighter({
  position: {x: 700, y: 200}, //by default, player starts at pos 0,0
  velocity: {x: 0, y: 0}, //by default, player starts with no velocity
  color: 'blue',
  offset: {x: -50, y: 0},
  imageSrc: './Assets/Martial Hero 2/Sprites/IdleRight.png',
  framesMax: 4,
  scale: 2.5,
  offset: {x: 215, y: 167},
  sprites: {
    idle: {
      imageSrc: './Assets/Martial Hero 2/Sprites/IdleRight.png',
      framesMax: 4
    },
    idleLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/IdleLeft.png',
      framesMax: 4
    },
    runright: {
      imageSrc: './Assets/Martial Hero 2/Sprites/RunRight.png',
      framesMax: 8
    },
    runleft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/RunLeft.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './Assets/Martial Hero 2/Sprites/JumpRight.png',
      framesMax: 2
    },
    jumpRV: {
      imageSrc: './Assets/Martial Hero 2/Sprites/JumpLeft.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './Assets/Martial Hero 2/Sprites/FallRight.png',
      framesMax: 2
    },
    fallRV: {
      imageSrc: './Assets/Martial Hero 2/Sprites/FallLeft.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Attack1Right.png',
      framesMax: 4
    },
    attack1RV: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Attack1Left.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Take hit Right.png',
      framesMax: 3
    },
    takeHitLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/Take hit Left.png',
      framesMax: 3
    },
    death: {
      imageSrc: './Assets/Martial Hero 2/Sprites/DeathRight.png',
      framesMax: 7
    },
    deathLeft: {
      imageSrc: './Assets/Martial Hero 2/Sprites/DeathLeft.png',
      framesMax: 7
    },
    crouchleftHold: {
      imageSrc: './Assets/Martial Hero 2/Sprites/HoldCrouchLeft.png',
      framesMax: 1
    },
    crouchrightHold: {
      imageSrc: './Assets/Martial Hero 2/Sprites/HoldCrouchRight.png',
      framesMax: 1
    }
  },
  framesHold: 8,
  attackBox: {
    offset: {
      x: 50,
      y: 0
    },
    width: 150,
    height: 30,
    hitframeStart: 2,
    hitframeEnd: 2,
    damage: 15,
    knockbackSpeedX: 4,
    knockbackSpeedY: 10,
    attackLagTime: 500,
    hitstunTime: 500
  },
  width: 50,
  height: 150
});
//enemy.draw();

//this is so the when the keys are lifted, if another key is pressed the player will still move
const keys = {
  a: {
    _pressed: false
  },
  d: {
    _pressed: false
  },
  w: {
    _pressed: false
  },
  s: {
    _pressed: false
  },
  ArrowRight: {
    _pressed: false
  },
  ArrowLeft: {
    _pressed: false
  },
  ArrowUp: {
    _pressed: false
  },
  ArrowDown: {
    _pressed: false
  },
  Space: {
    _pressed: false
  },
  frwSlash: {
    _pressed: false
  },
  mousedown: {
    _pressed: false,
    x: 0,
    y: 0
  }
}

//decreaseTimer();


//creating the animation loop
function animateGame() {
  //this says what function should be looped over and over again, since it is itself, it loops forever over the animation frames until specified
  //console.log("animate GO"); tests animation frame looping
  //clears the canvas each frame so there is no smear effect (previous frames remaining visible)
  background.update();
  shop.update();
  c.fillStyle = 'rgba(255, 255, 255, 0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update(); //animates player frame by frame
  enemy.update(); //animates enemy frame by frame

  //add extra if statement to detect if player is in knockback
  //sets player velocity equal to 0 (no inputs), then checks for inputs to move the player each frame
  if (!player.inHitstun) {
    player._velocity.x = 0;
  }
  if (!enemy.inHitstun) {
    enemy._velocity.x = 0;
  }

  if (player._position.x + (player._width/2) > enemy._position.x + (enemy._width/2)) {
    player.onLeft = false;
  }
  else {
    player.onLeft = true;
  }

  if (enemy._position.x + (enemy._width/2) > player._position.x + (player._width/2)) {
    enemy.onLeft = false;
  }
  else {
    enemy.onLeft = true;
  }

  //player movement

  if (keys.s._pressed && player._velocity.y === 0 && !player.onLeft) {
    if (player.heightAdjustment) {
      player._position.y = player._position.y + player.crouchHeight;
      player.heightAdjustment = false;
    }
    player._height = player.crouchHeight;
    player.switchSprite('crouchleftHold');
  }

  else if (keys.s._pressed && player._velocity.y === 0) {
    if (player.heightAdjustment) {
      player._position.y = player._position.y + player.crouchHeight;
      player.heightAdjustment = false;
    }
    player._height = player.crouchHeight;
    player.switchSprite('crouchrightHold');
  }
  else if (!keys.s._pressed && !player.heightAdjustment && !player.onLeft) {
    player.heightAdjustment = true;
    player._position.y = player._position.y - player.crouchHeight;
    player._height = player.crouchHeight * 2;
    player.switchSprite('idleLeft');
  }
  else if (!keys.s._pressed && !player.heightAdjustment) {
    player.heightAdjustment = true;
    player._position.y = player._position.y - player.crouchHeight;
    player._height = player.crouchHeight * 2;
    player.switchSprite('idle');
  }
  else if (keys.a._pressed && player._lastKey === 'a' && player._position.x > 10 && !keys.s._pressed) {
    player._velocity.x = -4;
    player.switchSprite('runleft'); //change to run back sprite
  }
  else if (keys.d._pressed && player._lastKey === 'd' && player._position.x + player._width < canvas.width - 10 && !keys.s._pressed) {
    player._velocity.x = 4;
    player.switchSprite('runright'); //change to run forward sprite
  }
  else if (!player.onLeft) {
    player.switchSprite('idleLeft');
  }
  else {
    player.switchSprite('idle');
  }
  //jumping
  if (player._velocity.y < 0) {
    player.switchSprite('jump');
  }
  else if (player._velocity.y > 0) {
    player.switchSprite('fall');
  }

  //enemy movement
  if (keys.ArrowDown._pressed && enemy._velocity.y === 0 && !enemy.onLeft) {
    if (enemy.heightAdjustment) {
      enemy._position.y = enemy._position.y + enemy.crouchHeight;
      enemy.heightAdjustment = false;
    }
    enemy._height = enemy.crouchHeight;
    enemy.switchSprite('crouchleftHold');
  }

  else if (keys.ArrowDown._pressed && enemy._velocity.y === 0) {
    if (enemy.heightAdjustment) {
      enemy._position.y = enemy._position.y + enemy.crouchHeight;
      enemy.heightAdjustment = false;
    }
    enemy._height = enemy.crouchHeight;
    enemy.switchSprite('crouchrightHold');
  }
  else if (!keys.ArrowDown._pressed && !enemy.heightAdjustment && !enemy.onLeft) {
    enemy.heightAdjustment = true;
    enemy._position.y = enemy._position.y - enemy.crouchHeight;
    enemy._height = enemy.crouchHeight * 2;
    enemy.switchSprite('idleLeft');
  }
  else if (!keys.ArrowDown._pressed && !enemy.heightAdjustment) {
    enemy.heightAdjustment = true;
    enemy._position.y = enemy._position.y - enemy.crouchHeight;
    enemy._height = enemy.crouchHeight * 2;
    enemy.switchSprite('idle');
  }
  else if (keys.ArrowLeft._pressed && enemy._lastKey === 'ArrowLeft' && enemy._position.x > 10 && !keys.ArrowDown._pressed) {
    enemy._velocity.x = -4;
    enemy.switchSprite('runleft'); //change to run left sprite
  }
  else if (keys.ArrowRight._pressed && enemy._lastKey === 'ArrowRight' && enemy._position.x + enemy._width < canvas.width - 10 && !keys.ArrowDown._pressed) {
    enemy._velocity.x = 4;
    enemy.switchSprite('runright'); //change to run right sprite
  }
  else if (!enemy.onLeft) {
    enemy.switchSprite('idleLeft');
  }
  else {
    enemy.switchSprite('idle');
  }
  if (enemy._velocity.y < 0 && enemy.onLeft) {
    enemy.switchSprite('jump');
  }
  else if (enemy._velocity.y < 0 && !enemy.onLeft) {
    enemy.switchSprite('jumpRV');
  }
  else if (enemy._velocity.y > 0 && enemy.onLeft) {
    enemy.switchSprite('fall');
  }
  else if (enemy._velocity.y > 0 && !enemy.onLeft) {
    enemy.switchSprite('fallRV');
  }

  //detect collision and hit animation
  //(in rectangularCollision)first two lines of if statement detect whether the attackBox is on the right or left side of enemy, second two lines are up/down
  //if player hits the enemy with attack1 or attack1RV
  //need to add activeframes object to fighter class so each character can use different activeframes for their collision detection
  //need to add damage variable for the fighter class so you can change how much damage to take depending on the character/attack
  if (rectangularCollision({rectangle1: player, rectangle2: enemy})
      && player._isAttacking && (player.framesCurrent === player._attackBox._hitframeStart || player.framesCurrent === player._attackBox._hitframeEnd)) {
    enemy.inHitstun = true;
    keys.ArrowLeft._pressed = false;
    keys.ArrowRight._pressed = false;
    enemy.takeHit(player._attackBox._damage)
    if (enemy._health > 0) {
      enemy._velocity.y = -player._attackBox._knockbackSpeedY;
      setTimeout(() => {
        enemy.inHitstun = false;
      }, player._attackBox._hitstunTime)
    }
    player._isAttacking = false;
    gsap.to('#enemyHealth', {
      width: enemy._health + '%'
    })
    //console.log('player hits enemy');
  }

  //if player misses
  if (player._isAttacking && (player.framesCurrent === player._attackBox._hitframeStart || player.framesCurrent === player._attackBox._hitframeEnd)) {
    //console.log(player._attackBox._hitframeStart);
    //console.log(player._attackBox._hitframeEnd);
    player._isAttacking = false;
    keys.Space._pressed = false;
  }


  //if enemy hits the player with attack1 or attack1RV
  if (rectangularCollision({rectangle1: enemy, rectangle2: player})
      && enemy._isAttacking && (enemy.framesCurrent === enemy._attackBox._hitframeStart)) {
    player.inHitstun = true;
    keys.a._pressed = false;
    keys.d._pressed = false;
    //player._velocity.x = -25;
    player.takeHit(enemy._attackBox._damage);
    if (player._health > 0) {
      player._velocity.y = -enemy._attackBox._knockbackSpeedY;
      setTimeout(() => {
        player.inHitstun = false;
      }, enemy._attackBox._hitstunTime)
    }
    enemy._isAttacking = false;
    gsap.to('#playerHealth', {
      width: player._health + '%'
    })
    //console.log('enemy hits player');
  }

  //if enemy misses
  if (enemy._isAttacking && (enemy.framesCurrent === enemy._attackBox._hitframeStart)) {
    enemy._isAttacking = false;
    keys.frwSlash._pressed = false;
  }

  if (enemy._health >= 0 && player._health >= 0) {
    gameSettings.gameOverToggle.toggle = false;
  }

  //end game based on health
  if (enemy._health <= 0 || player._health <= 0) {
    determineWinner({player, enemy, timerID});
    //console.log(gameSettings.gameOverToggle.toggle);
    gameEndcheck = true;

    setTimeout(() => {
      gameSettings.gameOverToggle.toggle = true;
    }, 5000)
  }
}
//animate();

//object to hold the game settings
const gameSettings = {
  menuToggle: {
    toggle: false
  },
  gameOverToggle: {
    toggle: false
  },
  gameScreenSwitch: {
    switch: 0
  },
  characterSelector: 0
}

var gameEndcheck = true;
const fps = 60;

//animates the entire game loop
function animateGameLoop() {
  //trying to set a definite fps lagged the program when trying to detect collision
  //setTimeout(() => {
    window.requestAnimationFrame(animateGameLoop);
  //}, 1000 / fps);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height); //clears the canvas each frame so there is no smear effect (previous frames remaining visible)

  if (gameSettings.gameOverToggle.toggle && gameEndcheck) {
    //window.cancelAnimationFrame(requestID);
    document.querySelector('#displayText').style.display = 'none';
    document.querySelector('#healthbarTimerInterface').style.display = 'none';
    keys.mousedown.x = 0;
    keys.mousedown.y = 0;
    player.reset();
    enemy.reset();

    timer = 61;
    document.querySelector('#timer').innerHTML = timer;

    document.querySelector('#playerHealth').style.width = '100%';
    document.querySelector('#enemyHealth').style.width = '100%';
    gameSettings.gameScreenSwitch.switch = 0;
    gameEndcheck = false;
    //console.log('reset');
  }

  if (gameSettings.gameScreenSwitch.switch == 0) {
    animateTitleScreen();
  }
  else if (gameSettings.gameScreenSwitch.switch == 1) {
    animateGame();
  }
  else if (gameSettings.gameScreenSwitch.switch == 2) {
    animateCharacterScreen();
  }

}

function animateTitleScreen() {
  startBackground.update();
  fightButton.update();
  controlsButton.update();
  //collision for clicking the fight button to start the game
  if (clickButtonCollision({x: keys.mousedown.x, y: keys.mousedown.y, button: fightButton}) && !gameSettings.menuToggle.toggle) {
    //console.log('buttonpressed');
    /*
    document.querySelector('#healthbarTimerInterface').style.display = 'flex';
    gameSettings.gameScreenSwitch.switch = 1;
    decreaseTimer();*/
    keys.mousedown.x = 0;
    keys.mousedown.y = 0;
    gameSettings.gameScreenSwitch.switch = 2;
  }
  else if (clickButtonCollision({x: keys.mousedown.x, y: keys.mousedown.y, button: controlsButton})) {
    gameSettings.menuToggle.toggle = true;
    document.querySelector('#controlsMenu').style.display = 'inline-block';
  }
  else if (clickButtonCollision({x: keys.mousedown.x, y: keys.mousedown.y, button: xButton}) && gameSettings.menuToggle.toggle) {
    gameSettings.menuToggle.toggle = false;
    document.querySelector('#controlsMenu').style.display = 'none';
  }
}

function animateCharacterScreen() {
  characterSelectBackground.update();
  foxfaceSelectButton.update();
  vicSelectButton.update();
  if (gameSettings.characterSelector === 2) {gameSettings.gameScreenSwitch.switch = 1; document.querySelector('#healthbarTimerInterface').style.display = 'flex'; decreaseTimer(); gameSettings.characterSelector = 0;}

  if (clickButtonCollision({x: keys.mousedown.x, y: keys.mousedown.y, button: vicSelectButton}) && !gameSettings.menuToggle.toggle) {
    //console.log('buttonpressed');
    if (gameSettings.characterSelector === 0) {changePlayer({character: player, target: vic}); gameSettings.characterSelector = 1;}
    else if (gameSettings.characterSelector === 1) {changePlayer({character: enemy, target: vic}); gameSettings.characterSelector = 2;}
    keys.mousedown.x = 0;
    keys.mousedown.y = 0;
    /*
    changePlayer({player: player, target: vic});
    document.querySelector('#healthbarTimerInterface').style.display = 'flex';
    gameSettings.gameScreenSwitch.switch = 1;
    decreaseTimer();*/
  }
  if (clickButtonCollision({x: keys.mousedown.x, y: keys.mousedown.y, button: foxfaceSelectButton}) && !gameSettings.menuToggle.toggle) {
    //console.log('buttonpressed');
    //console.log(player.imageSrc);
    //console.log(characterVic.framesMax);
    if (gameSettings.characterSelector === 0) {changePlayer({character: player, target: foxface}); gameSettings.characterSelector = 1;}
    else if (gameSettings.characterSelector === 1) {changePlayer({character: enemy, target: foxface}); gameSettings.characterSelector = 2;}
    keys.mousedown.x = 0;
    keys.mousedown.y = 0;
    /*
    changePlayer({player: player, target: foxface});
    document.querySelector('#healthbarTimerInterface').style.display = 'flex';
    gameSettings.gameScreenSwitch.switch = 1;
    decreaseTimer();*/
  }
}

//moving characters with event listeners

//adds an event listener that detects whether a key is pressed down on the keyboard
//this event listener moves the player to the right when d is pressed down
window.addEventListener('keydown', (event) => {
  if (!player.dead && !player.inHitstun && !player.inAttackLag) {
    switch (event.key) {
      case 'd':
        keys.d._pressed = true;
        player._lastKey = 'd';
        break
      case 'a':
        keys.a._pressed = true;
        player._lastKey = 'a';
        break
      case 'w':
        if (player._velocity.y == 0) {
          player._numJumps = 1;
          //console.log(player._numJumps);
          player._velocity.y = -12;
        }
        else if (player._numJumps == 0) {
        }
        else if (player._position.y + player._height <= canvas.height - 100) {
          player._numJumps -= 1;
          player._velocity.y = -10;
        }
        break
      case 's':
        keys.s._pressed = true;
        //player._lastKey = 's';
        break
      case ' ':
        keys.Space._pressed = true;
        if (player._velocity.y === 0) {
          keys.d._pressed = false;
          keys.a._pressed = false;
        }
        //console.log("space pressed")
        break
    }
    //if statements for directional attacks and testing whether player/enemy is on the right/left side of the screen
    if (keys.Space._pressed && player.onLeft && !keys.s._pressed) {
        player.attack1();
    }
    else if (keys.Space._pressed && !player.onLeft && !keys.s._pressed){
        player.attack1RV();
    }
  }
  if (!enemy.dead && !enemy.inHitstun && !enemy.inAttackLag) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight._pressed = true;
        enemy._lastKey = 'ArrowRight';
        break
      case 'ArrowLeft':
        keys.ArrowLeft._pressed = true;
        enemy._lastKey = 'ArrowLeft';
        break
      case 'ArrowUp':
        if (enemy._velocity.y == 0) {
          enemy._numJumps = 1;
          //console.log(player._numJumps);
          enemy._velocity.y = -12;
        }
        else if (enemy._numJumps == 0) {
        }
        else if (enemy._position.y + enemy._height <= canvas.height - 100) {
          enemy._numJumps -= 1;
          enemy._velocity.y = -10;
        }
        break
      case 'ArrowDown':
        keys.ArrowDown._pressed = true;
        break
      case '/':
        keys.frwSlash._pressed = true;
        if (enemy._velocity.y === 0) {
          keys.ArrowRight._pressed = false;
          keys.ArrowLeft._pressed = false;
        }
        //console.log('/')
        break
    }
    if (keys.frwSlash._pressed && enemy.onLeft && !keys.ArrowDown._pressed) {
        enemy.attack1();
    }
    else if (keys.frwSlash._pressed && !enemy.onLeft && !keys.ArrowDown._pressed){
        enemy.attack1RV();
    }
  }
  //console.log(event.key);
})

//this event listener stops moving the player when the key is lifted
window.addEventListener('keyup', (event) => {
  //player keys
  switch (event.key) {
    case 'd':
      keys.d._pressed = false;
      break
    case 'a':
      keys.a._pressed = false;
      break
    case 's':
      keys.s._pressed = false;
      break
    case ' ':
      keys.Space._pressed = false;
      break
  }
  //enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight._pressed = false;
      break
    case 'ArrowLeft':
      keys.ArrowLeft._pressed = false;
      break
    case 'ArrowDown':
      keys.ArrowDown._pressed = false;
      break
    case '/':
      keys.frwSlash._pressed = false;
      break
  }
})


function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  keys.mousedown.x = event.clientX - rect.left;
  keys.mousedown.y = event.clientY - rect.top;
  //console.log("x: " + x + " " + "y: " + y);
}

window.addEventListener('mousedown', function(e) {
  //keys.mousedown._pressed = true;
  getCursorPosition(canvas, e);
  //console.log(keys.mousedown.x, keys.mousedown.y);
})

function main() {
  animateGameLoop();
}
main();
