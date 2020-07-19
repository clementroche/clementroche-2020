attribute vec3 barycentric;

varying vec3 vBarycentric;
varying vec3 vPosition;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vBarycentric = barycentric;
  vPosition = position.xyz;
}