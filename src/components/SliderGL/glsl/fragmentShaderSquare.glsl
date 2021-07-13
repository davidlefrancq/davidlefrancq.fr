#version 100

precision mediump float;

varying vec3 vVertexPosition;
varying vec2 vActiveTextureCoord;
varying vec2 vNextTextureCoord;

uniform sampler2D uActiveTexture;
uniform sampler2D uNextTexture;

uniform float uDirection;
uniform float uProgress;
uniform vec2 uResolution;

float square(vec2 position, float size){
    size = 1.0 - size;
    vec2 bl =  step(size * 0.5, position);
    vec2 tr =  step(size * 0.5, 1.0 - position);
    return bl.x * bl.y * tr.x * tr.y;
}

vec2 positionNormalizer(vec3 vVertexPosition, vec2 uResolution){
    vec2 position = vVertexPosition.xy * 0.5 + 0.5;
    position = position * normalize(uResolution);
    position += (1.0 - normalize(uResolution)) * 0.5;
    return position;
}

vec2 centerNormalizer(vec2 uResolution, float uDirection){
    vec2 center = vec2(1.0) - vec2(0.5) + normalize(uResolution) * 0.5;
    center += normalize(uResolution) * (uDirection * 0.5 - 0.5);
    return center;
}

float gradientGenerator(vec2 position, vec2 center, float progress){
    float gradient = 1.0 - distance(position, center) + (progress * 2.0 - 1.0);
    return smoothstep(0.1, 0.9, gradient);
}

float alphaGenerator(vec2 position, float gradient){
    vec2 positionGradient = fract(position * 20.0);
    float alpha = square(positionGradient, gradient);
    return alpha;
}

void main() {
    vec2 position = positionNormalizer(vVertexPosition, uResolution);

    float progress = uProgress;

    vec2 center = centerNormalizer(uResolution, uDirection);
    float gradient = gradientGenerator(position, center, progress);

    float alpha = alphaGenerator(position, gradient);

    vec4 activeColor = texture2D(uActiveTexture, vActiveTextureCoord);
    vec2 nextTextureCoord = vNextTextureCoord;
    nextTextureCoord -= (1.0 - gradient) * 0.05 * uDirection;
    vec4 nextColor = texture2D(uNextTexture, nextTextureCoord);

    gl_FragColor = mix(activeColor, nextColor, alpha);
}
