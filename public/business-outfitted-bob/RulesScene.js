class RulesScene extends Phaser.Scene {
    constructor() {
      super({ key: 'RulesScene' });
    }
  
    preload() {
    }
  
    create() {
      // Add background or UI elements
      this.add.text(240, 100, 'Game Rules', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
  
      // Add the rules text
      const rulesText = `
        1. Use arrow keys to move.
        2. Collect money bags to earn points.
        3. Avoid any obstacles(Paperwork).
        4. Try to beat your highest score!
      `;
      this.add.text(200, 200, rulesText, { fontSize: '18px', color: '#fff'}).setOrigin(0.5);
  
      // Add a button to start the game
      const startButton = this.add.text(240, 400, 'Start Game', { fontSize: '24px', color: '#00ff00' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.scene.start('GameScene'); // Switch to the Game Scene
        });
  
      // Add a button to go back to the menu (optional)
      const backButton = this.add.text(240, 450, 'Back to Menu', { fontSize: '24px', color: '#ff0000' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.scene.start('StartScene'); // Switch to the Start Scene
        });
    }
  }
  