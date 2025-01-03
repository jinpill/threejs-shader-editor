precision mediump float;

out vec3 pixelNormal;

void main() {
  pixelNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
