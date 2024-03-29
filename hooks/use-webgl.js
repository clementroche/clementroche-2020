import Stats from 'stats.js'

import viewport from '@/plugins/viewport'
import useRAF from '@/hooks/use-raf.js'

let webgl

class WebGL {
  constructor() {
    const RAF = useRAF()

    // clock
    this.clock = new THREE.Clock()

    // scene
    this.scene = new THREE.Scene()

    // this.scene.background = new THREE.Color(0xffffff)

    // this.camera = new THREE.PerspectiveCamera(
    //   40,
    //   viewport.width / viewport.height,
    //   0.1,
    //   100000
    // )

    // this.camera.position.z = 8

    this.camera = new THREE.OrthographicCamera(
      viewport.width / -2,
      viewport.width / 2,
      viewport.height / 2,
      viewport.height / -2,
      0.001,
      100000
    )

    this.camera.position.z = 1000

    // canvas
    this.canvas = document.createElement('canvas')

    // WEBGL2
    // const { WEBGL } = require('three/examples/jsm/WebGL')
    // const context = this.canvas.getContext(
    //   WEBGL.isWebGL2Available() ? 'webgl2' : 'webgl',
    //   { alpha: false }
    // )

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false,
      canvas: this.canvas,
      // context,
      scene: this.scene
    })
    this.renderer.setSize(viewport.width, viewport.height)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)

    // console.log(this.renderer.autoClear)

    // composer
    const Composer = require('@/webgl/composer').default
    this.composer = new Composer({
      camera: this.camera,
      renderer: this.renderer,
      scene: this.scene
    })
    // this.composer.enabled = false

    // stats
    if (process.env.NODE_ENV !== 'production') {
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
      RAF.add('stats-begin', this.stats.begin, -1000)
      RAF.add('stats-end', this.stats.end, 1000)
    }

    // raycaster
    const Raycaster = require('@/webgl/raycaster').default
    this.raycaster = new Raycaster(this.camera)

    // events
    viewport.events.on('resize', this.onWindowResize.bind(this))

    // raf
    RAF.add('use-webgl', this.loop.bind(this), 1)
  }

  loop(clock) {
    this.renderer.setSize(viewport.width, viewport.height)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    this.composer.render(clock)
    this.renderer.renderLists.dispose()
  }

  get viewsize() {
    let width, height
    if (this.camera.type === 'PerspectiveCamera') {
      const distance = this.camera.position.z
      const vFov = (this.camera.fov * Math.PI) / 180
      height = 2 * Math.tan(vFov / 2) * distance
      width = height * viewport.ratio
    } else if (this.camera.type === 'OrthographicCamera') {
      width = viewport.width
      height = viewport.height
    }

    return { width, height }
  }

  onWindowResize() {
    if (this.camera.type === 'PerspectiveCamera') {
      this.camera.aspect = viewport.width / viewport.height
    } else if (this.camera.type === 'OrthographicCamera') {
      this.camera.left = viewport.width / -2
      this.camera.right = viewport.width / 2
      this.camera.top = viewport.height / 2
      this.camera.bottom = viewport.height / -2
    }

    this.camera.updateProjectionMatrix()
  }

  destroy() {
    const RAF = useRAF()
    RAF.remove('stats-begin')
    RAF.remove('stats-end')
    RAF.remove('use-webgl')
  }
}

const useWebGL = () => {
  return webgl || (webgl = new WebGL())
}

export default useWebGL
