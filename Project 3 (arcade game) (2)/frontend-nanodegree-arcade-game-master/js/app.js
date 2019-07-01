

let Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,

    this.x = x;
    this.y = y + 60;
    this.speed = speed;
    this.step = 101;
    this.border = this.step * 5
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < this.step * 5) {
      this.x += this.speed * dt;
    }
    else {
      this.x = -101; //allows bug to start off screens and "crawl" back on
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Hero {
  constructor() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(input) {  //moves the character around and ensures it stays within boundaries
    switch(input) {
      case 'left':
        if (this.x > 0) {
          this.x -= 101;
        }
        break;
      case 'up':
        if (this.y < 0) {
          //this.success();??
        } else {
          this.y -= 83;
        }
        break;
      case 'right':
        if (this.x < 400) {
          this.x += 101;
        }
        break;
      case 'down':
        if (this.y < 400) {
          this.y += 83;
        }
        break;
      }
    }
  update() {
    // collision code adapted from : https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    let playerBox = {x: this.x, y: this.y, width: 50, height: 40};
    let enemyBox = {x: Enemy.x, y: Enemy.y, width: 60, height: 70};
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
        alert('Game Over!');
      }
  }
};

const player = new Hero();
const allEnemies = [];
const bug1 = new Enemy(-101,0, 50);
const bug2 = new Enemy(0, 83, 100);
const bug3 = new Enemy(101*3, 83*2, 130);
const bug4 = new Enemy(-101*2, 83, 200);
const bug5 = new Enemy(-101*5, 0, 50);
const bug6 = new Enemy(-101*4, 83*2, 100);
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);

//use Math.random() instead????


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
