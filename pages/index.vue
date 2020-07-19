<template>
  <div class="pageIndex"></div>
</template>

<script>
import useWebGL from '@/hooks/use-webgl'
// import useRAF from '@/hooks/use-raf'

import Grid from '@/webgl/components/grid'

export default {
  mounted() {
    const { scene, camera } = useWebGL()

    this.grid = new Grid()
    camera.add(this.grid)
    scene.add(camera)

    // camera controls
    const {
      OrbitControls
    } = require('three/examples/jsm/controls/OrbitControls.js')
    this.cameraControls = new OrbitControls(
      camera,
      document.getElementById('__nuxt')
    )
  },

  methods: {},

  beforeDestroy() {
    const { scene } = useWebGL()

    scene.remove(this.grid)
  }
}
</script>

<style lang="scss">
.pageIndex {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
</style>
