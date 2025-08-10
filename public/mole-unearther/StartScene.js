class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' });
	}

	preload() {
		this.load.image('startScreen', 'assets/start.png');
	}

	create() {
		// const background = this.add.image(0, 0, 'startScreen');
		// background.setOrigin(0);
		// background.setScale(0.5);

		// this.input.on('pointerup', () => {
		// 	this.scene.start('GameScene');
		// 	this.scene.stop('StartScene');
		// });
		const startButton = this.add.text(240, 275, 'Start Game', { fontSize: '24px', color: 'white' })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('GameScene'); // Go to the Game Scene
      });

    // Add a button to view the rules
    const rulesButton = this.add.text(240, 325, 'View Rules', { fontSize: '24px', color: 'white' })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('RulesScene'); // Go to the Rules Scene
      });
	}
}
