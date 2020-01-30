//variables needed to be declared first
const character = document.querySelectorAll('img.avatar');
const popup = document.querySelector('.modal');
const popup2 = document.querySelector('.modal2');
const counter = document.querySelector('.level');
const button = document.querySelector('button');

let level = 1;


let Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y + 60;
    this.speed = speed;
    this.step = 101;
    this.border = this.step * 5;
    this.width = 75;
    this.height = 45;
    this.sprite = 'images/enemy-bug.png';
};

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
    this.width = 55;
    this.height = 65;
    this.sprite = 'images/char-boy.png';  //default sprite on page load but changed by setAvatar()
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(input) {  //moves the character around and ensures it stays within canvas boundaries
    switch(input) {
      case 'left':
        if (this.x > 0) {
          this.x -= 101;
        }
        break;
      case 'up':
        if (this.y < 0) {
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
    for(let enemy of allEnemies) {
      if (this.x < enemy.x + enemy.width &&
          this.x + this.width > enemy.x &&
          this.y < enemy.y + enemy.height &&
          this.y + this.height > enemy.y) {
        gameOver();
      }
    if (this.y === -15) {
        this.x = 200;
        this.y = 400;
        levelUp();
    }
  }
  }
};

//variables that only work after constructors are in place
const player = new Hero();
const allEnemies = [];
const bug1 = new Enemy(-101,0, 50);
const bug2 = new Enemy(0, 83, 100);
const bug3 = new Enemy(101*3, 83*2, 130);
const bug4 = new Enemy(-101*2, 83, 200);
const bug5 = new Enemy(-101*5, 0, 50);
const bug6 = new Enemy(-101*4, 83*2, 100);
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);


// allows user to select desired avatar
function setAvatar1() {
  player.sprite = "images/char-cat-girl.png";
}

function setAvatar2() {
  player.sprite = "images/char-horn-girl.png";
}

function setAvatar3() {
  player.sprite = "images/char-boy.png";
}

function setAvatar4() {
  player.sprite = "images/char-pink-girl.png";
}

function setAvatar5() {
  player.sprite = "images/char-princess-girl.png";
}
//


// adds click to character select screen
character.forEach(character => character.addEventListener('click', closeModal));

//removes starting popup after character has been selected
function closeModal() {
    popup.style.display = "none";
}

//pulls up Game Over screen with stats and allows for game replay
function gameOver() {
  popup2.style.display = "block";
  document.getElementById("finalLevel").innerHTML = level;
  button.addEventListener("click", function(e){
    location.reload();
  })
}

//keeps tally of how many times user reaches the water
function levelUp() {
  level++;
  counter.innerHTML = level;
}

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
