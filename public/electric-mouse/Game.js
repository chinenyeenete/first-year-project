// Game's Metadata
const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: "808080",
  scene: [StartScene, GameScene, EndScene, RulesScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: 200,
      enableBody: true
    }
  }
};

const game = new Phaser.Game(config);
