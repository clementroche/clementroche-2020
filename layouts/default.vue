<template>
  <div>
    <shell-noise class="shellNoise" />
    <nuxt />
    <webgl-scene class="shellScene" />
  </div>
</template>

<script>
export default {
  beforeDestroy() {
    const GUI = useGUI()
    GUI.destroy()
  }
}
</script>

<style lang="scss">
#__nuxt {
  height: 100%;
  overflow-y: auto;
}

.shellScene {
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: -1;
}

.shellNoise {
  height: calc(var(--vh, 1vh) * 100);
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;
}
</style>
