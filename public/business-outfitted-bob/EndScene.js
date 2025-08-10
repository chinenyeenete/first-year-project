class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  preload() {
    this.load.image(
      "end",
      "assets/end.png"
    );
  }

  create() {
    screen = this.add.image(0, 0, "end").setOrigin(0);

    // Reset global variables
    submitHighScore('Business Outfitted Bob', score);
    score = 0;
    speed = 1;
    // Reset sprite positions
    gameState.numCoordinates = {};

    fetchHighScore("Business Outfitted Bob").then((highscore) => {
      this.add
        .text(240, 20, `Highscore: ${highscore}`, {
          fontSize: "20px",
          color: "black",
          fontWeight: "bold",
        })
        .setOrigin(0.5);
    });

    this.input.keyboard.on("keydown", () => {
      this.scene.stop("EndScene");
      this.scene.start("GameScene");
    });
  }
}
