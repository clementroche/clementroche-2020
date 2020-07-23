<template>
  <div class="pageIndex">
    <block-introduction class="pageIndex__introduction" />
  </div>
</template>

<script>
import gsap from 'gsap'

import useWebGL from '@/hooks/use-webgl'
import useGUI from '@/hooks/use-gui'
import useRAF from '@/hooks/use-raf'

import Grid from '@/webgl/components/grid'

export default {
  mounted() {
    const { scene, camera, composer } = useWebGL()
    const GUI = useGUI()
    const RAF = useRAF()

    this.grid = new Grid()
    camera.add(this.grid)
    scene.add(camera)

    // camera controls
    // const {
    //   OrbitControls
    // } = require('three/examples/jsm/controls/OrbitControls.js')
    // this.cameraControls = new OrbitControls(
    //   camera,
    //   document.getElementById('__nuxt')
    // )

    GUI.add(this.grid.uniforms.uAppear, 'value')
      .min(0)
      .max(1)
      .step(0.1)

    composer.events.on('load', this.onComposerLoaded)

    RAF.add('index', this.loop, 0)
  },

  methods: {
    loop(clock) {
      this.grid.update(clock)
    },
    onComposerLoaded() {
      gsap.to(this.grid.uniforms.uAppear, {
        value: 1,
        duration: 2,
        ease: 'expo.in'
      })
    }
  },

  beforeDestroy() {
    const { scene } = useWebGL()

    scene.remove(this.grid)
  }
}
</script>

<style lang="scss">
.pageIndex {
  align-items: center;
  color: #fff;
  display: flex;
  position: relative;

  @include media('>m') {
    height: calc(var(--vh, 1vh) * 100);
    overflow: hidden;
  }

  &__introduction {
    width: 100%;

    @include media('<=m') {
      padding-bottom: 25vh;
      padding-top: 25vh;
    }
    //   margin-left: auto;
    //   margin-right: auto;
    //   max-width: 1800px;
    //   padding-bottom: 25vh;
    //   padding-left: 20px;
    //   padding-right: 20px;
    // padding-top: 25vh;
    //   width: 100%;

    //   @include media('>m') {
    //     width: 70%;
    //   }
  }
}
</style>
