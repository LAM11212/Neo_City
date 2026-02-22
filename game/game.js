let screenRight = 600;

class Example extends Phaser.Scene {
    constructor() {
        super('Example');
    }

    scoreText;
    score = 0;
    justScored = false;

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('player', 'assets/player_stationary.png');
        this.load.image('obstacle', 'assets/Obstacle.png');
        this.load.image('player_jump', 'assets/player_jumping.png');
    }

    create() {
        this.add.image(0, 0, 'background').setScale(1.3);
        this.obstacles = this.physics.add.group();
        
        this.player = this.physics.add.sprite(50, 50, 'player').setScale(0.5);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            delay: 1700,
            callback: this.generateNewObstacle,
            callbackScope: this,
            loop: true
        });

        this.isDead = false;

        this.physics.add.overlap(this.player, this.obstacles, this.killPlayer, null, this);
        this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
    }

    update() {
        if(this.isDead) return;
        if(this.cursors.space.isDown) {
            this.player.setVelocityY(-200);
            this.player.setTexture('player_jump');
        } else {
            this.player.setTexture('player');
        }

        if(this.player.y > 600 || this.player.y < 0) {
            console.log("player dead");
            this.killPlayer();
        }

        this.obstacles.getChildren().forEach((block) => {
            if(block.x < -50) {
                block.destroy();
            } 

            if(block.isTop && !block.scored && block.x < this.player.x) {
                block.scored = true;
                this.score++;
                this.scoreText.setText('score: ' + this.score);
            }
        });
 
    }

    generateNewObstacle() {
        let gapSize = 100;
        let minY = 100;
        let maxY = 500;
        let y = Phaser.Math.Between(minY, maxY);

        let topBlock = this.obstacles.create(screenRight, y - gapSize/2, 'obstacle');
        topBlock.setOrigin(0.5, 1).setScale(1, 15);
        topBlock.body.allowGravity = false;
        topBlock.setVelocityX(-200);
        topBlock.scored = false;
        topBlock.isTop = true;

        let bottomBlock = this.obstacles.create(screenRight, y + gapSize/2, 'obstacle');
        bottomBlock.setOrigin(0.5, 0).setScale(1, 15);
        bottomBlock.body.allowGravity = false;
        bottomBlock.setVelocityX(-200);
        bottomBlock.scored = false;
            
    }

    killPlayer() {
        this.isDead = true;
        this.physics.pause();

        this.scene.start('GameOverScene', {
            score: this.score,
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [Example, GameOverScene]
};

const game = new Phaser.Game(config);

// https://labs.phaser.io/phaser4-view.html?src=src%5Cgames%5Cfirstgame%5Cpart2.js&return=phaser4-index.html%3Fpath%3Dgames%252Ffirstgame
// website above for documentation/tutorials.