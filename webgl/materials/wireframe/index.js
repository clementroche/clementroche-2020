import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

export default class wireframeMaterial extends THREE.ShaderMaterial {
  constructor({ wireframeColor = 0xffffff, lineThickness = 1.0 } = {}) {
    super({
      extensions: {
        derivatives: true
      },
      uniforms: {
        uWireframeColor: {
          value: new THREE.Color(wireframeColor)
        },
        uLineThickness: {
          value: lineThickness
        },
        uAppear: {
          value: 1.0
        }
      },
      vertexShader,
      fragmentShader,
      transparent: true
      // side: THREE.DoubleSide,
      // depthTest: false
    })
  }
}
