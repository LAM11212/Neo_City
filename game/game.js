let screenRight = 600;

class Example extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('obstacle', 'assets/testObstacle.png');
    }

    create() {
        this.add.image(0, 0, 'background').setScale(1.3);
        this.obstacles = this.physics.add.group();
        
        this.player = this.physics.add.sprite(50, 50, 'player').setScale(2);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            delay: 1500,
            callback: this.generateNewObstacle,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        if(this.cursors.space.isDown) {
            this.player.setVelocityY(-200);
        } 

        this.obstacles.getChildren().forEach((block) => {
            if(block.x < -50) {
                block.destroy();
            }
        });
 
    }

    generateNewObstacle() {
        let minY = 50;
        let maxY = 550;
        let y = Phaser.Math.Between(minY, maxY);

        let block = this.obstacles.create(screenRight, y, 'obstacle');
        block.body.allowGravity = false;
        block.setVelocityX(-200);

        return block;
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
    scene: Example
};

const game = new Phaser.Game(config);

// https://labs.phaser.io/phaser4-view.html?src=src%5Cgames%5Cfirstgame%5Cpart2.js&return=phaser4-index.html%3Fpath%3Dgames%252Ffirstgame
// website above for documentation/tutorials.