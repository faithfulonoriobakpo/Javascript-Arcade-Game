// Enemies player must avoid
var Enemy = function() {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (100 - 70 + 1) + 70);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if(this.x > 600){
        this.x *= dt;
        this.speed += 8;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
    constructor(x=200,y=380){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
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
        }
        else if(direction == 'down' && this.y != 380){
            this.y += 80;
        }
    }
    update(){

    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

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
