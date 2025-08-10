class RulesScene extends Phaser.Scene {
    constructor() {
      super({ key: 'RulesScene' });
    }
  
    preload() {
      // Load any assets required for the rules scene (e.g., background images).
    }
  
    create() {
      // Add background or UI elements
      this.add.text(240, 100, 'Game Rules', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
  
      // Add the rules text
      const rulesText = `
        1. Press the correct key when a mole 
            appears.
        2. Use J, H, K, and L for their respective
            moles.
        3. Build streaks for bonus points; avoid 
            mistakes.
        4. Play fast; the game has a time limit.
        5. Aim for the highest score before time 
            runs out!
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