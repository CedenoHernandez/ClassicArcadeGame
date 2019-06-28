

let Enemy = function() {
    // Variables applied to each of our instances go here,

    this.x = 0;
    this.y = 0;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy is not passed boundary
      // move forward
      // increment x by speed * dt
    // else
      // reset pos to start


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Hero {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.sprite = 'images/char-boy.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // methods
    // update position update()
      // check collision here
        // did player x and y collide with enemy?
      // check win here
        // did player x and y reach final tile?
    // handleInput()
      // update player's x and y property according to input
    // reset hero
      // set x and y to starting x and y
}

const player = new Hero();
const allEnemies = [];
const bug1 = new Enemy();



// init allEnemies array
// for each enenmy create and push new enemy into above array


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
};