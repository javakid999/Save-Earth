import { Vec2 } from "./vec2.js";

export class Square {
	constructor(position, size, color) {
        this.position = position;
        this.size = size;
		this.color = color;
	}

	render(ctx) {
		ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
	}

    checkCollision(obj) {
        return (this.position.x <= obj.position.x 
            && this.position.x + this.size.x >= obj.position.x)
            && (this.position.y <= obj.position.y + obj.size.y
            && this.position.y + this.size.y >= obj.position.y + obj.size.y)
    }
}

export class Circle {
	constructor(position, radius, color) {
        this.position = position;
        this.radius = radius;
		this.color = color;
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
	}
}

export class Line {
    constructor(a, b, color) {
        this.a = a;
        this.b = b;
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }
}