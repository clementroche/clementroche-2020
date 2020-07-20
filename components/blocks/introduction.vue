<template>
  <div class="introduction">
    <div
      :class="{ transition__fadeIn: true, 'transition--on': mounted }"
      class="e-section"
      style="transition-delay: 0.5s;"
    >
      <h1 v-kinesis="{ depth: 10 }">Hi, I'm Clément, a web developer.</h1>
      <ul v-kinesis="{ depth: 5 }" class="introduction__positions">
        <li>Freelance</li>
        <li>
          Front developer
          <a
            href="https://neuviemepage.studio/"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            @Neuviemepage
          </a>
        </li>
        <li>
          Student
          <a
            href="https://www.gobelins.fr/"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            @Gobelins
          </a>
        </li>
      </ul>
    </div>
    <div
      :class="{ transition__fadeIn: true, 'transition--on': mounted }"
      class="e-section"
      style="transition-delay: 0.7s;"
    >
      <h2 v-kinesis="{ depth: 10 }" class="e-section-title">works</h2>
      <ul v-kinesis="{ depth: 5 }">
        <li>
          <a
            href="https://lecantiche.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            Le Cantiche
          </a>
        </li>
        <li>
          <a
            href="https://edoardosmerilli.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            Edoardo Smerilli
          </a>
        </li>
        <li>
          <a
            href="https://emanuelemilella.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            Emanuele Milella
          </a>
        </li>
        <li>
          <a
            href="https://basement.studio/"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            Basement Studio
          </a>
        </li>
        <li>
          <a
            href="https://www.cobosrl.co/"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            Cobo
          </a>
        </li>
      </ul>
    </div>
    <div
      :class="{ transition__fadeIn: true, 'transition--on': mounted }"
      class="e-section"
      style="transition-delay: 0.9s;"
    >
      <h2 v-kinesis="{ depth: 10 }" class="e-section-title">recognitions</h2>
      <ul v-kinesis="{ depth: 5 }">
        <li>Awwwards <sub>x4</sub></li>
        <li>FWA <sub>x3</sub></li>
        <li>CSS Design Awards <sub>x5</sub></li>
      </ul>
    </div>
    <div
      :class="{ transition__fadeIn: true, 'transition--on': mounted }"
      class="e-section"
      style="transition-delay: 1.1s;"
    >
      <h2 v-kinesis="{ depth: 10 }" class="e-section-title">socials</h2>
      <ul v-kinesis="{ depth: 5 }">
        <li>
          <a href="mailto:rchclement@gmail.com" class="u-link-hover">
            Email
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/clementroche_"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/cl%C3%A9ment-roche/"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/clementroche"
            target="_blank"
            rel="noopener noreferrer"
            class="u-link-hover"
          >
            Github
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import useWebGL from '@/hooks/use-webgl'

export default {
  data() {
    return {
      mounted: false
    }
  },
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

    setTimeout(() => {
      this.mounted = true
    }, 0)
  }
}
</script>

<style lang="scss">
.e-section-title {
  font-size: 10px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}

.e-section {
  margin: 80px 0 30px;
}

.introduction {
  color: #fff;
  font-family: var(--font-grotesk);
  font-size: 30px;
  line-height: 45px;

  sub {
    font-size: 20px;
    line-height: 35px;
  }

  &__positions {
    font-size: 20px;
    line-height: 35px;
  }
}
</style>
