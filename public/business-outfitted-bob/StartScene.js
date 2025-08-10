class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.image('start', 'assets/start.png');
  }

  create() {
    this.add.image(240, 320, 'start');  // Add the background image
    // Add a button to start the game
    const startButton = this.add.text(240, 560, 'Start Game', { fontSize: '24px', color: 'white' })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('GameScene'); // Go to the Game Scene
      });

    // Add a button to view the rules
    const rulesButton = this.add.text(240, 600, 'View Rules', { fontSize: '24px', color: 'white' })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('RulesScene'); // Go to the Rules Scene
      });
  }
}

