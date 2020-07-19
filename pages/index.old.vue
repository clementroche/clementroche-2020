<template>
  <div class="pageIndex"></div>
</template>

<script>
import useWebGL from '@/hooks/use-webgl'
import useGUI from '@/hooks/use-gui'

// import computeBarycentricBuffer from '@/assets/js/computeBarycentricBuffer'
import unindexBufferGeometry from '@/assets/js/unindexBufferGeometry'

import WireframeMaterial from '@/webgl/materials/wireframe'

import Grid from '@/webgl/components/grid'

function computeBarycentric(position, removeEdge = true) {
  const count = position.count / 3
  const barycentric = []

  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) barycentric.push(0, 0, 1, 0, 1, 0, 1, 0, 0)
    else barycentric.push(0, 1, 0, 0, 0, 1, 1, 0, 0)
  }

  return new Float32Array(barycentric)
}

export default {
  methods: {
    load() {
      const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js')
      const loader = new GLTFLoader()

      return new Promise((resolve) => {
        loader.load('obj/hand_export.glb', (gltf) => {
          this.model = gltf.scene
          resolve()
        })
      })
    }
  },
  async mounted() {
    const { scene, camera } = useWebGL()
    const GUI = useGUI()

    this.grid = new Grid()
    camera.add(this.grid)
    scene.add(camera)

    GUI.addObject3D('grid', this.grid)

    // camera controls
    const {
      OrbitControls
    } = require('three/examples/jsm/controls/OrbitControls.js')
    this.cameraControls = new OrbitControls(
      camera,
      document.getElementById('__nuxt')
    )

    const geometry = new THREE.TorusBufferGeometry(1, 0.3, 8, 30)
    // const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 10, 10, 10)
    // const geometry = new THREE.IcosahedronBufferGeometry(1, 1)
    const material = new WireframeMaterial({ wireframeColor: 0x2ff000 })
    this.torus = new THREE.Mesh(geometry, material)

    unindexBufferGeometry(geometry)
    // const barycentricAttribute = computeBarycentricBuffer(geometry, true)
    // geometry.setAttribute('barycentric', barycentricAttribute)

    geometry.setAttribute(
      'barycentric',
      new THREE.BufferAttribute(
        computeBarycentric(geometry.attributes.position),
        3
      )
    )

    // scene.add(this.torus)

    GUI.addObject3D('torus', this.torus)

    await this.load()

    scene.add(this.model)
    this.model.visible = false

    const wireframeMaterial = new WireframeMaterial({
      wireframeColor: 0x2ff000,
      lineThickness: 1.0
    })

    this.model.traverse((child) => {
      if (child.type === 'Mesh') {
        unindexBufferGeometry(child.geometry)
        // const attribute = computeBarycentricBuffer(child.geometry, true)
        child.geometry.setAttribute(
          'barycentric',
          new THREE.BufferAttribute(
            computeBarycentric(child.geometry.attributes.position),
            3
          )
        )

        child.material = wireframeMaterial
      }
    })

    GUI.add(wireframeMaterial.uniforms.uAppear, 'value')
      .min(0)
      .max(1)

    // this.rightHand = this.model.children[0].children[0]
    // this.leftHand = this.model.children[0].children[0]

    // GUI.addObject3D('right', this.rightHand)
    // GUI.addObject3D('left', this.rightHand)
  },

  beforeDestroy() {
    const { scene } = useWebGL()
    const GUI = useGUI()

    scene.remove(this.torus)
    scene.remove(this.model)
    GUI.removeFolder(GUI.__folders.torus)
  }
}
</script>

<style lang="scss">
.pageIndex {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
</style>
