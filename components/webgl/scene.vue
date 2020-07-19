<template>
  <div class="shellScene">
    <webgl-info />
  </div>
</template>

<script>
import useWebGL from '@/hooks/use-webgl'
import useGUI from '@/hooks/use-gui'

export default {
  mounted() {
    const { canvas } = useWebGL()
    this.$el.appendChild(canvas)
  },
  beforeDestroy() {
    const WebGL = useWebGL()
    WebGL.destroy()

    const GUI = useGUI()
    GUI.destroy()
  }
}
</script>

<style lang="scss">
.shellScene {
  canvas {
    height: 100% !important;
    width: 100% !important;
  }
}
</style>
