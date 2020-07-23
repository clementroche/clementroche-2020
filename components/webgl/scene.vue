<template>
  <div class="shellScene">
    <webgl-info v-if="showInfo" />
  </div>
</template>

<script>
import useWebGL from '@/hooks/use-webgl'
import useGUI from '@/hooks/use-gui'

export default {
  data() {
    return {
      showInfo: false
    }
  },
  mounted() {
    const { canvas } = useWebGL()
    this.$el.appendChild(canvas)

    if (process.env.NODE_ENV !== 'production') {
      this.showInfo = true
    }
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
