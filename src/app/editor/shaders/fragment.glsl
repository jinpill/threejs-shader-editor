precision mediump float;

in vec3 pixelNormal;

vec3 diffuseColor = vec3(0.0, 0.72, 1.0);

void main() {
  float shade = (
    3.0 * pow(abs(pixelNormal.y), 2.0) +
    2.0 * pow(abs(pixelNormal.z), 2.0) +
    1.0 * pow(abs(pixelNormal.x), 2.0)
  ) / 3.0;

  gl_FragColor = vec4(diffuseColor * shade,  1.0);
}
