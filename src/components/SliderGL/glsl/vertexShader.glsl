#version 100

precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform mat4 uActiveTextureMatrix;
uniform mat4 uNextTextureMatrix;

varying vec3 vVertexPosition;
varying vec2 vActiveTextureCoord;
varying vec2 vNextTextureCoord;

void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vVertexPosition = aVertexPosition;
    vActiveTextureCoord = (uActiveTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vNextTextureCoord = (uNextTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
}
