let jewels = [];
let playerScore = 0;
let playerHealth = 5;
let movesCount = 0;
let playerScoreView = document.querySelector('#playerScore');
let playerHealthView = document.querySelector('#playerHealth');

playerHealthView.innerHTML = "❤️❤️❤️❤️❤️";
playerScoreView.innerHTML = playerScore;
// Enemies player must avoid
var Enemy = function(x,y,w,h,isFlipped=false) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = Math.floor(Math.random() * (120 - 90 + 1) + 90);
    this.isFlipped = isFlipped;
    this.sprite = isFlipped? 'images/enemy-bug-flipped.png':'images/enemy-bug.png';

    this.flip = function(){
        this.sprite = 'images/enemy-bug-flipped.png';
        this.isFlipped = true;
        this.x = 550;
        this.y = [75,160,240][Math.floor((Math.random() * 3))];
    }

    this.unflip = function() {
        this.sprite = 'images/enemy-bug.png';
        this.isFlipped = false;
        this.x = -10;
        this.y = [75,160,240][Math.floor((Math.random() * 3))];
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    let randomResult = Math.floor(Math.random()*2);
    this.x = this.isFlipped? this.x - (dt * this.speed): this.x + (dt * this.speed);
    if(!this.isFlipped && this.x > 600){
        if(randomResult == 0){
            this.flip();
        }
        else{
            this.x = -10;
            this.y = [75,160,240][Math.floor((Math.random() * 3))];
        }
    }
    else if(this.isFlipped && this.x < -120){
        if(randomResult == 1){
            this.unflip();
        }
        else{
            this.x = 550;
            this.y = [75,160,240][Math.floor((Math.random() * 3))];
        }
    }
    if(movesCount == 5){
        this.speed += 2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.w, this.h);
};

class Player {
    constructor(x=200,y=380,w=101,h=171){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    handleInput(direction){
        if(direction == 'left' && this.x != 0){
            this.x -= 100;
        }
        else if(direction == 'right' && this.x != 400){
            this.x += 100;
        }
        else if(direction == 'up' && this.y != -20){
            this.y -= 80;
            movesCount += 1;
            if(movesCount == 5){
                setTimeout(() => {
                    movesCount = 0;
                    player.x = 200;
                    player.y = 380;
                    playerScore += 10;
                    playerScoreView.innerHTML = playerScore;
                },300);
            }
        }
        else if(direction == 'down' && this.y != 380){
            this.y += 80;
            movesCount -= 1;
        }
    }
    update(){
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.w, this.h);
    }
}

class Heart {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sprite = 'images/Heart.png';
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.w, this.h);
    }
}

class Gem {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = ['Blue', 'Green', 'Orange'][Math.floor(Math.random()*3)];
        this.sprite = `images/Gem ${this.color}.png`;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.w, this.h);
    }
}

let enemyOne = new Enemy(0,75,100,150);
let enemyTwo = new Enemy(550,160,100,150, true);
let enemyThree = new Enemy(-70,240,100,150);

let allEnemies = [enemyOne,enemyTwo,enemyThree];

let player = new Player();

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
