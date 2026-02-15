class Example extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('player', 'assets/player.png');
    }

    create() {
        this.add.image(0, 0, 'background').setScale(1.3);
        this.player = this.physics.add.sprite(50, 50, 'player').setScale(2);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if(this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else if(this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if(this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);

// https://labs.phaser.io/phaser4-view.html?src=src%5Cgames%5Cfirstgame%5Cpart2.js&return=phaser4-index.html%3Fpath%3Dgames%252Ffirstgame
// website above for documentation/tutorials.