const geometry = new THREE.PlaneBufferGeometry(1, 1)

const camera = new THREE.OrthographicCamera(
  1 / -2,
  1 / 2,
  1 / 2,
  1 / -2,
  0.001,
  1000
)

camera.position.z = 1

export default class Program extends THREE.Scene {
  constructor(material) {
    super()
    this.material = material
    this.mesh = new THREE.Mesh(geometry, this.material)

    this.scene = new THREE.Scene()
    this.scene.add(this.mesh)
  }

  get program() {
    return this.material
  }

  render(renderer) {
    renderer.render(this.scene, camera)
  }
}
