<template>
  <div>
    <shell-noise class="shellNoise" />
    <nuxt class="nuxt" />
    <webgl-scene class="shellScene" />
    <block-socials class="socials" />
  </div>
</template>

<script>
import useWebGL from '@/hooks/use-webgl'

export default {
  mounted() {
    const { composer } = useWebGL()

    const elements = this.$el.querySelectorAll('a')

    elements.forEach((element) => {
      element.addEventListener(
        'mouseenter',
        () => {
          composer.glitchEffect.mode = 2

          setTimeout(() => {
            composer.glitchEffect.mode = 0
          }, 100)
        },
        false
      )
    })
  }
}
</script>

<style lang="scss">
#__nuxt {
  color: #fff;
  font-family: var(--font-spacemono-regular);
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

.socials {
  position: absolute;
  z-index: 2;

  @include media('<=m') {
    left: 20px;
    top: 20px;
  }

  @include media('>m') {
    bottom: 60px;
    right: 60px;
  }
}
</style>
