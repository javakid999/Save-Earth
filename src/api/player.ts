import type { Canvas } from './canvas.js';
import { Square } from './sprite.js';
import { Vec2 } from './vec2.js';

export class Player {
    position: Vec2;
    canvas: Canvas;
    sprite: Square;
    keys: {left: boolean, right: boolean};
    keyDownListener: EventListener;
    keyUpListener: EventListener;

	constructor(canvas: Canvas, position: Vec2) {
		this.position = position;
		this.canvas = canvas;
		this.sprite = new Square(this.position, new Vec2(0.1, 0.1), [0,1,0,1]);
        this.keys = {left: false, right: false};

		this.canvas.addItem(this.sprite);

		this.keyDownListener = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'a':
					this.keys.left = true;
					break;
				case 'd':
					this.keys.right = true;
					break;
			}
		}
		this.keyUpListener = (e: KeyboardEvent) => { 
            switch (e.key) {
				case 'a':
					this.keys.left = false;
					break;
				case 'd':
					this.keys.right = false;
					break;
			}
        }

		window.addEventListener('keydown', this.keyDownListener);
		window.addEventListener('keyup', this.keyUpListener);
	}

	update() {
        if (this.keys.left && this.position.x > -1) {
            this.position.x -= 0.01;
        }
        if (this.keys.right && this.position.x < 0.9) {
            this.position.x += 0.01;
        }
        this.sprite.pos = this.position
	}


	terminate() {
		window.removeEventListener('keydown', this.keyDownListener);
		window.removeEventListener('keyup', this.keyUpListener);
	}
}
