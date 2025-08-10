const config = {
	type: Phaser.AUTO,
	width: 480,
	height: 640,
	physics: {
		default: 'arcade',
	},
	backgroundColor: '808080',
	scene: [StartScene, GameScene, EndScene, RulesScene ],
};

const game = new Phaser.Game(config);