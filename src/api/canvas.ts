import type { Circle, Tri, Square} from "./sprite.js";
import type { Vec2 } from "./vec2.js";

export class Canvas {
    element: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    items: Array<Tri | Circle | Square>;
    dimensions: Vec2;

	program: WebGLProgram;
	colorLocation: number;
	positionLocation: number;
	buffer: WebGLBuffer;
	bufferData: Array<number>;

    constructor(dimensions: Vec2, vsrc: string, fsrc: string) {
        this.element = document.createElement('canvas');
		this.element.setAttribute('class', 'game-canvas');
        this.element.width = dimensions.x;
        this.element.height = dimensions.y;
        this.gl = this.element.getContext('webgl2');
        document.getElementById('canvas').appendChild(this.element);

		const dpr = window.devicePixelRatio || 1;

		this.element.width = this.element.clientWidth * dpr;
		this.element.height = this.element.clientHeight * dpr;

		this.dimensions = dimensions;
		
		this.items = [];
		this.bufferData = [];

		//WebGL initialization 
		this.gl.viewport(0, 0, this.element.width, this.element.height);
		this.program = this.complileProgram(vsrc, fsrc);
		this.positionLocation = this.gl.getAttribLocation(this.program, 'vertexPosition');
		this.colorLocation = this.gl.getAttribLocation(this.program, 'vertexColor');
		this.buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
		this.gl.enable(this.gl.BLEND)
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

	complileProgram(vsrc: string, fsrc: string) {
		let vshader = this.gl.createShader(this.gl.VERTEX_SHADER);
		this.gl.shaderSource(vshader, vsrc);
		this.gl.compileShader(vshader);
		let fshader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fshader, fsrc);
		this.gl.compileShader(fshader);
		console.log(this.gl.getShaderInfoLog(vshader));
		console.log(this.gl.getShaderInfoLog(fshader));
		let program = this.gl.createProgram();
		this.gl.attachShader(program, vshader);
		this.gl.attachShader(program, fshader);
		this.gl.linkProgram(program);
		console.log(this.gl.getProgramInfoLog(program));

		return program;
	}

	addItem(item: Tri | Circle | Square) {
		this.items.push(item);
	}

	removeItem(item: Tri | Circle | Square) {
		this.items.splice(this.items.indexOf(item), 1);
	}

	render() {
		this.bufferData = [];
		this.gl.clearColor(0, 0, 0, 0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.items.forEach((item) => {
			this.bufferData.push(...item.transcribe());
		});
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.bufferData), this.gl.STATIC_DRAW);

		const vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(vao);
		this.gl.enableVertexAttribArray(this.positionLocation);
		this.gl.enableVertexAttribArray(this.colorLocation);
		this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
		this.gl.vertexAttribPointer(this.colorLocation, 4, this.gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

		this.gl.useProgram(this.program);
		this.gl.bindVertexArray(vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.bufferData.length / 6);
	}
}