varying vec3 vBarycentric;
uniform vec3 uWireframeColor;
uniform float uLineThickness;
uniform float uAppear;

void main () {
  vec3 bary = vBarycentric;
  vec3 color = vec3(0);
  float alpha = 1.0;

  // Line thickness - in pixels
  float width = uLineThickness * 0.5;
  vec3 d = fwidth(bary);
  vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), bary);
  alpha *= max(max(s.x, s.y), s.z);
  // Dashes
//   alpha *= step(0.0, sin(max(bary.x, bary.y) * 3.14 * 5.0));
  // Back face shading
 color = mix(vec3(1, 0, 0), color, vec3(gl_FrontFacing));
  alpha = mix(alpha * 0.1 + 0.02, alpha, float(gl_FrontFacing));


  gl_FragColor.rgb = vec3(alpha);
  gl_FragColor.rgb *= uWireframeColor;
  gl_FragColor.a = uAppear;
}