/*class Character {
  constructor({imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, sprites, framesHold = 20, attackBox = { offset: {x: this._width, y: 0}, width: undefined, height: undefined}, width = 50, height = 150}) {
    this.imageSrc = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.offset = offset;
    this.sprites = sprites;
    this.framesHold = framesHold;
    this.attackBox = attackBox;
    this.width = width;
    this.height = height;
  }
}
*/


//class for basic sprite with position in constructor
//be sure to set the constructor property (_position) to the position of the argument
//usually, sprite classes have methods like gravity, velocity, movement
class Sprite {
  //wrapping arguments in {} makes them a joined property, making order not matter
  constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, framesHold = 20, width = 50, height = 150}) {
    this._position = position;
    this._width = width;
    this._height = height;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0; //all the frames that have elapsed
    this.framesHold = framesHold; //how many frames to go through before changing animation frame
    this.offset = offset; // an offset for the character model since attacks need to spawn inside the image of the animation
  }

  //draws out the sprite at its xy position
  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width/this.framesMax),
      0,
      this.image.width/this.framesMax,
      this.image.height,
      this._position.x - this.offset.x,
      this._position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  //to be called when sprites are moving on the screen
  update() {
    this.draw();
    this.animateFrames();
  }

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      }
      else {
        this.framesCurrent = 0;
      }
    }
  }
}

class Fighter extends Sprite {
  //wrapping arguments in {} makes them a joined property, making order not matter
  constructor({position,
    velocity,
    color = 'red',
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = {x: 0, y: 0},
    sprites,
    framesHold,
    attackBox = { offset: {x: this._width, y: 0}, width: undefined, height: undefined, hitframeStart: 0, hitframeEnd: 0, damage: 0, knockbackSpeedX: 0, knockbackSpeedY: 0, hitstunTime: 0, attackLagTime: 0},
    width = 50,
    height = 150
  }) {
    //methods set by the parent constructor (Sprite class)
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })

    this._position = position;
    this._velocity = velocity;
    this._width = width;
    this._height = height;
    this._lastKey;
    this._numJumps = 2;

    this._attackBox = {
      _position: {
        x: this._position.x,
        y: this._position.y,
      },
      _width: attackBox.width,
      _height: attackBox.height,
      _offset: attackBox.offset,
      _hitframeStart: attackBox.hitframeStart,
      _hitframeEnd: attackBox.hitframeEnd,
      _damage: attackBox.damage,
      _knockbackSpeedX: attackBox.knockbackSpeedX,
      _knockbackSpeedY: attackBox.knockbackSpeedY,
      _hitstunTime: attackBox.hitstunTime,
      _attackLagTime: attackBox.attackLagTime
    };
    this._color = color;
    this._isAttacking;
    this._health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.sprites = sprites;
    this.dead = false;
    this.onLeft = true;
    this.crouchHeight = this._height/2;
    this.heightAdjustment = true;
    this.inHitstun = false;
    this.inAttackLag = false;
    this.startPosition = {
      x: position.x,
      y: position.y
    }

    //sprite is the key for the animation (so like idle or run)
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  //to be called when sprites are moving on the screen
  update() {
    this.draw();
    if (!this.dead) {
      this.animateFrames();
    }

    //draws attack boxes
    if (this.onLeft) {
      this._attackBox._position.x = this._position.x + this._attackBox._offset.x;
      this._attackBox._position.y = this._position.y + this._attackBox._offset.y;
      this._attackBox._position.x += this._velocity.x;
      this._attackBox._position.y += this._velocity.y;
    }
    else {
      this._attackBox._position.x = (this._position.x + this._width) - (this._attackBox._offset.x + this._attackBox._width);
      this._attackBox._position.y = this._position.y + this._attackBox._offset.y;
      this._attackBox._position.x += this._velocity.x;
      this._attackBox._position.y += this._velocity.y;
    }

    //this line draws the hitboxes
    c.fillRect(this._attackBox._position.x, this._attackBox._position.y, this._attackBox._width, this._attackBox._height);

    this._position.y += this._velocity.y;
    this._position.x += this._velocity.x;

    //this line draws the hurtboxes
    c.fillRect(this._position.x, this._position.y, this._width, this._height);

    //add elif statement to test if fighter is hit (add hit detection object) and if fighter is hit, they are unable to move and take a set amount of knockback (add if extra if statement to key registry to detect fighter.hitState)
    //if the position of the sprite at the bottom of the canvas, y-velocity equals 0, otherwise, y-velocity downwards is increased every frame by the gravity constant
    if (this._position.y + this._height + this._velocity.y >= canvas.height - 72) {
      this._velocity.y = 0;
      this._position.y = canvas.height - 72 - this._height;
    }
    else {
      this._velocity.y += gravity;
    }
    if (this.inHitstun && this._health > 0) {
      if (this.onLeft) {
        this._velocity.x = -this._attackBox._knockbackSpeedX;
      }
      else {
        this._velocity.x = this._attackBox._knockbackSpeedX;
      }
    }
    //console.log(this._position.y);
  }

/*//setTimeout calls a wait in milliseconds
setTimeout(() => {
  this._isAttacking = false;
}, 100)*/

  reset() {
    this._health = 100;
    this.dead = false;
    this._velocity.x = 0;
    this._velocity.y = 0;
    this.image = this.sprites.idle.image;
    this.framesMax = this.sprites.idle.framesMax;
    this.framesCurrent = 0;
    this._position.x = this.startPosition.x;
    this._position.y = this.startPosition.y;
    //console.log(this.startPosition.x, this.startPosition.y);
  }

  attack1() {
    this.switchSprite('attack1');
    this._isAttacking = true;
    this.inAttackLag = true;
    setTimeout(() => {
      this.inAttackLag = false;
    }, this._attackBox._attackLagTime)
  }

  attack1RV() {
    this.switchSprite('attack1RV')
    this._isAttacking = true;
    this.inAttackLag = true;
    setTimeout(() => {
      this.inAttackLag = false;
    }, this._attackBox._attackLagTime)
  }

  takeHit(damage) {
    this._health -= damage;

    if (this._health <= 0) {
      this.inHitstun = false;
      this._velocity.x = 0;
      if (!this.onLeft) {this.switchSprite('deathLeft');}
      else {this.switchSprite('death');}
    }
    else {
      if (!this.onLeft) {this.switchSprite('takeHitLeft');}
      else {this.switchSprite('takeHit')}
    }
  }

  switchSprite(sprite) {
    //overriding all other animations when player dies
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1) {
        this.dead = true;
      }
      return
    }
    if (this.image === this.sprites.deathLeft.image) {
      if (this.framesCurrent === this.sprites.deathLeft.framesMax - 1) {
        this.dead = true;
      }
      return
    }

    //overriding all other animations when player gets hit
    if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) {
      return
    }
    if (this.image === this.sprites.takeHitLeft.image && this.framesCurrent < this.sprites.takeHitLeft.framesMax - 1) {
      return
    }

    //overriding all other animations when player attacks
    if (this.image === this.sprites.attack1.image
      && this.framesCurrent < this.sprites.attack1.framesMax - 1) return;

    if (this.image === this.sprites.attack1RV.image
      && this.framesCurrent < this.sprites.attack1RV.framesMax - 1) return;

    switch(sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'runleft':
        if (this.image !== this.sprites.runleft.image) {
          this.image = this.sprites.runleft.image;
          this.framesMax = this.sprites.runleft.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'runright':
        if (this.image !== this.sprites.runright.image) {
          this.image = this.sprites.runright.image;
          this.framesMax = this.sprites.runright.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'attack1RV':
        if (this.image !== this.sprites.attack1RV.image) {
          this.image = this.sprites.attack1RV.image;
          this.framesMax = this.sprites.attack1RV.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'crouchleftHold':
        if (this.image !== this.sprites.crouchleftHold.image) {
          this.image = this.sprites.crouchleftHold.image;
          this.framesMax = this.sprites.crouchleftHold.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'crouchrightHold':
        if (this.image !== this.sprites.crouchrightHold.image) {
          this.image = this.sprites.crouchrightHold.image;
          this.framesMax = this.sprites.crouchrightHold.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'idleLeft':
        if (this.image !== this.sprites.idleLeft.image) {
          this.image = this.sprites.idleLeft.image;
          this.framesMax = this.sprites.idleLeft.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'jumpRV':
        if (this.image !== this.sprites.jumpRV.image) {
          this.image = this.sprites.jumpRV.image;
          this.framesMax = this.sprites.jumpRV.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'fallRV':
        if (this.image !== this.sprites.fallRV.image) {
          this.image = this.sprites.fallRV.image;
          this.framesMax = this.sprites.fallRV.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'deathLeft':
        if (this.image !== this.sprites.deathLeft.image) {
          this.image = this.sprites.deathLeft.image;
          this.framesMax = this.sprites.deathLeft.framesMax;
          this.framesCurrent = 0;
        }
        break
      case 'takeHitLeft':
        if (this.image !== this.sprites.takeHitLeft.image) {
          this.image = this.sprites.takeHitLeft.image;
          this.framesMax = this.sprites.takeHitLeft.framesMax;
          this.framesCurrent = 0;
        }
        break

    }
  }
}
