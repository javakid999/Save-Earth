export class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vec: Vec2) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }

    subtract(vec: Vec2) {
		return new Vec2(this.x - vec.x, this.y - vec.y);
    }

    equals(vec: Vec2) {
        return this.x === vec.x && this.y === vec.y;
    }

    scale(num: number) {
		return new Vec2(this.x * num, this.y * num);
	}
}