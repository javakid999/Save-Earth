import { Vec2 } from "./vec2.js";

export class Square {
    position: Vec2;
    size: Vec2;
    color: Array<number> | Array<Array<number>>;
    tris: Array<Tri>;

	constructor(position: Vec2, size: Vec2, color: Array<number> | Array<Array<number>>) {
        this.position = position;
        this.size = size;
		this.color = color;

        if (this.color[0] instanceof Array) {
            this.tris = [
                new Tri([new Vec2(this.position.x, this.position.y), new Vec2(this.position.x + this.size.x, this.position.y), new Vec2(this.position.x + this.size.x, this.position.y + this.size.y)], this.color as Array<Array<number>>),
                new Tri([new Vec2(this.position.x, this.position.y), new Vec2(this.position.x, this.position.y + this.size.y), new Vec2(this.position.x + this.size.x, this.position.y + this.size.y)], this.color as Array<Array<number>>)
            ];
        } else {
            this.tris = [
                new Tri([new Vec2(this.position.x, this.position.y), new Vec2(this.position.x + this.size.x, this.position.y), new Vec2(this.position.x + this.size.x, this.position.y + this.size.y)], this.color as Array<number>),
                new Tri([new Vec2(this.position.x, this.position.y), new Vec2(this.position.x, this.position.y + this.size.y), new Vec2(this.position.x + this.size.x, this.position.y + this.size.y)], this.color as Array<number>)
            ];
        }
	}

    set pos(v: Vec2) {
        if (this.color[0] instanceof Array) {
            this.tris = [
                new Tri([new Vec2(v.x, v.y), new Vec2(v.x + this.size.x, v.y), new Vec2(v.x + this.size.x, v.y + this.size.y)], this.color as Array<Array<number>>),
                new Tri([new Vec2(v.x, v.y), new Vec2(v.x, v.y + this.size.y), new Vec2(v.x + this.size.x, v.y + this.size.y)], this.color as Array<Array<number>>)
            ];
        } else {
            this.tris = [
                new Tri([new Vec2(v.x, v.y), new Vec2(v.x + this.size.x, v.y), new Vec2(v.x + this.size.x, v.y + this.size.y)], this.color as Array<number>),
                new Tri([new Vec2(v.x, v.y), new Vec2(v.x, v.y + this.size.y), new Vec2(v.x + this.size.x, v.y + this.size.y)], this.color as Array<number>)
            ];
        }
    }

    transcribe() {
        let transcribedTri = [];
        this.tris.forEach((tri) => {
            transcribedTri.push(...tri.transcribe());
        });
        return transcribedTri;
	}
}

export class Circle {
    position: Vec2;
    radius: number;
    res: number;
    color: Array<number> | Array<Array<number>>;
    tris: Array<Tri>;
	constructor(position: Vec2, radius: number, res: number, color: Array<number> | Array<Array<number>>) {
        this.position = position;
        this.radius = radius;
        this.res = res;
		this.color = color;
        this.tris = [];
        
        if (this.color[0] instanceof Array) {
            for (let i = 0; i < this.res; i++) {
                this.tris.push(new Tri([new Vec2(this.position.x,this.position.y), new Vec2(this.position.x-this.radius*Math.cos(i * Math.PI * 2 / this.res), this.position.y - this.radius * Math.sin(i * Math.PI * 2 / this.res)), new Vec2(this.position.x - this.radius * Math.cos((i-1) * Math.PI * 2 / this.res), this.position.y - this.radius * Math.sin((i-1) * Math.PI * 2 / this.res))], this.color as Array<Array<number>>));
            }
        } else {
            for (let i = 0; i < this.res; i++) {
                this.tris.push(new Tri([new Vec2(this.position.x,this.position.y), new Vec2(this.position.x-this.radius*Math.cos(i * Math.PI * 2 / this.res), this.position.y - this.radius * Math.sin(i * Math.PI * 2 / this.res)), new Vec2(this.position.x - this.radius * Math.cos((i-1) * Math.PI * 2 / this.res), this.position.y - this.radius * Math.sin((i-1) * Math.PI * 2 / this.res))], this.color as Array<number>));
            }
        }
	}

	transcribe() {
        let transcribedTri = [];
        this.tris.forEach((tri) => {
            transcribedTri.push(...tri.transcribe());
        });
        return transcribedTri;
	}
}

export class Tri {
    position: Array<Vec2>;
    color: Array<number> | Array<Array<number>>;
    constructor(position: Array<Vec2>, color: Array<number> | Array<Array<number>>) {
        this.position = position;
        this.color = color;
    }

    transcribe() {
        if (this.color[0] instanceof Array) {
            return [...this.position[0].toArray(), ...(this.color as Array<Array<number>>)[0], ...this.position[1].toArray(), ...(this.color as Array<Array<number>>)[1], ...this.position[2].toArray(), ...(this.color as Array<Array<number>>)[2]];
        } else {
            return [...this.position[0].toArray(), ...this.color, ...this.position[1].toArray(), ...this.color, ...this.position[2].toArray(), ...this.color];
        }
    }
}