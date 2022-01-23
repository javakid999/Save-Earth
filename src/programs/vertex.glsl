#version 300 es

precision mediump float;

in vec2 vertexPosition;
in vec4 vertexColor;
out vec4 fragColor;

void main() {
    fragColor = vertexColor;
    gl_Position = vec4(vertexPosition, 0.0, 1.0);
}