class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create(data) {

        this.add.text(300, 200, "GAME-OVER", {
            fontSize: '48px',
            color: '#ff0000'
        }).setOrigin(0.5);

        this.add.text(300, 270, `Score: ${data.score}`, {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        let replayButton = this.add.text(300, 350, "Replay", {
            fontSize: '32px',
            backgroundColor: '#000',
            padding: 10
        }).setOrigin(0.5).setInteractive();

        replayButton.on('pointerdown', () => {
            this.scene.start('Example');
        });
    }
}