let screenRight = 600;
let score = 0;
class Example extends Phaser.Scene {
    constructor() {
        super('Example');
    }
    
    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('obstacle', 'assets/Obstacle.png');
    }

    create() {
        this.add.image(0, 0, 'background').setScale(1.3);
        this.obstacles = this.physics.add.group();
        
        this.player = this.physics.add.sprite(50, 50, 'player').setScale(2);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            delay: 1700,
            callback: this.generateNewObstacle,
            callbackScope: this,
            loop: true
        });

        this.isDead = false;

        this.physics.add.overlap(this.player, this.obstacles, this.killPlayer, null, this);
    }

    update() {
        if(this.isDead) return;
        if(this.cursors.space.isDown) {
            this.player.setVelocityY(-200);
        } 

        if(this.player.y > 600 || this.player.y < 0) {
            console.log("player dead");
            this.killPlayer();
        }

        this.obstacles.getChildren().forEach((block) => {
            if(block.x < -50) {
                block.destroy();
            }
        });
 
    }

    generateNewObstacle() {
        let gapSize = 150;
        let minY = 100;
        let maxY = 500;
        let y = Phaser.Math.Between(minY, maxY);

        let topBlock = this.obstacles.create(screenRight, y - gapSize/2, 'obstacle');
        topBlock.setOrigin(0.5, 1);
        topBlock.body.allowGravity = false;
        topBlock.setVelocityX(-200);

        let bottomBlock = this.obstacles.create(screenRight, y + gapSize/2, 'obstacle');
        bottomBlock.setOrigin(0.5, 0);
        bottomBlock.body.allowGravity = false;
        bottomBlock.setVelocityX(-200);

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