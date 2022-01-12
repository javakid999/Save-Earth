import { Circle, Square } from "./sprite.js";
import { Vec2 } from "./vec2.js";

export class Canvas {

    constructor(dimensions) {
        this.element = document.createElement('canvas');
		this.element.setAttribute('class', 'game-canvas');
        this.element.width = dimensions.x;
        this.element.height = dimensions.y;
        this.ctx = this.element.getContext('2d');
        document.body.appendChild(this.element);

		const dpr = window.devicePixelRatio || 1;

		this.element.width = this.element.clientWidth * dpr;
		this.element.height = this.element.clientHeight * dpr;

		this.ctx.scale(this.element.clientWidth * dpr / dimensions.x, this.element.clientHeight * dpr / dimensions.y);

		this.dimensions = dimensions;
		
		this.items = [];
    }

	addItem(item) {
		this.items.push(item);
	}

	removeItem(item) {
		this.items.splice(this.items.indexOf(item), 1);
	}

	render() {
		this.ctx.clearRect(0, 0, 1500, 750);
        

		for (let item of this.items) {
			item.render(this.ctx);
		}
	}
}