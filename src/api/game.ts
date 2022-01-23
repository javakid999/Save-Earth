import { Canvas } from "./canvas";
import { Vec2 } from "./vec2";
import vsrc  from '../programs/vertex.glsl?raw';
import fsrc  from '../programs/fragment.glsl?raw';
import { Player } from "./player";

export class Game {
    canvas: Canvas;
    gameOver: boolean;
    player: Player;

	constructor() {
		this.canvas = new Canvas(new Vec2(800, 800), vsrc, fsrc);
		this.player = new Player(this.canvas, new Vec2(0, -1));
		this.gameOver = false;

		this.update();
	}

	update() {
		if (this.gameOver) {
			this.terminate();
			return;
		}
		
		window.requestAnimationFrame(this.update.bind(this));
		this.player.update();
		this.canvas.render();
	}

	terminate() {
		this.player.terminate();
	}
}