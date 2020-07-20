import gsap from 'gsap'

import useWebGL from '@/hooks/use-webgl'

import viewport from '@/plugins/viewport'
import mouse from '@/plugins/mouse'

import fragmentShader from '@/webgl/materials/grid/fragment.glsl'
import vertexShader from '@/webgl/materials/grid/vertex.glsl'

export default class Grid extends THREE.Object3D {
  constructor({ color = 0x2ff000, segments = 18 } = {}) {
    super()

    this.geometry = new THREE.PlaneBufferGeometry(1, 1)
    this.uniforms = {
      uColor: { value: new THREE.Color(color) },
      uOffset: { value: new THREE.Vector2() },
      uRatio: {
        value: new THREE.Vector2()
      },
      uSegments: {
        value: segments
      },
      uCursor: {
        value: new THREE.Vector2(0.5, 0.5)
      }
    }

    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: this.uniforms,
      transparent: true,
      extensions: {
        derivatives: true
      }
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.add(this.mesh)

    this.position.z = -1

    this.onWindowResize()

    viewport.events.on('resize', this.onWindowResize.bind(this))
    mouse.events.on('mousemove', this.onMouseMove.bind(this))
  }

  onMouseMove(e) {
    const { x, y } = e.normalized

    gsap.to(this.uniforms.uCursor.value, {
      duration: 3,
      ease: 'expo.out',
      x: x * 0.5 + 0.5,
      y: y * 0.5 + 0.5
    })

    gsap.to(this.uniforms.uOffset.value, {
      duration: 3,
      ease: 'expo.out',
      x: -x * 0.5 + 0.5,
      y: -y * 0.5 + 0.5
    })
  }

  onWindowResize() {
    this.scale.set(this.size.x, this.size.y, 1)

    this.uniforms.uRatio.value.y = 1
    this.uniforms.uRatio.value.x = this.size.x / this.size.y
  }

  get size() {
    const { camera } = useWebGL()
    const v = new THREE.Vector2()

    if (camera.type === 'PerspectiveCamera') {
      const distance = Math.abs(this.position.z)
      const vFov = (camera.fov * Math.PI) / 180
      v.y = 2 * Math.tan(vFov / 2) * distance
      v.x = v.y * viewport.ratio
    } else if (camera.type === 'OrthographicCamera') {
      v.x = viewport.width
      v.y = viewport.height
    }

    return v
  }
}
