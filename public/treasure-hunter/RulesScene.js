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
        1. Click anywhere to start the game.
        2. Take turns selecting cells on the grid.
        3. Find gold coins to score points; avoid 
        holes.
        4. The bot also selects cells to find 
        treasures.
        5. Collect more coins than the bot to win!
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
  