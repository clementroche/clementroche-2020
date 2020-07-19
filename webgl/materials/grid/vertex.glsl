varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vVertex;

void main() {
  vPosition = position;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
}