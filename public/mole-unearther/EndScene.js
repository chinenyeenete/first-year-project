class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  preload() {
    this.load.image(
      "endScreen",
      "assets/game-over.png"
    );
  }

  create() {
    const background = this.add.image(0, 0, "endScreen");
    background.setOrigin(0);
    background.setScale(0.5);
    this.add.text(240, 470, `Your score is ${score}.`).setColor("#553a1f").setOrigin(0.5);
    submitHighScore("Mole Unearther", score);
    fetchHighScore("Mole Unearther").then((highscore) => {
      this.add
        .text(240, 500, `Highscore: ${highscore}`, {
          fontSize: "18px",
          color: "white",
        })
        .setOrigin(0.5);
    });
    this.input.on("pointerup", () => {
      score = 0;
      timeLeft = 30;
      isPaused = false;
      lastHitTime = 30;

      this.scene.start("GameScene");
      this.scene.stop("EndScene");
    });

  }
}
