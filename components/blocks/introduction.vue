<template>
  <div class="introduction">
    <div
      :class="{ transition__fadeIn: true, 'transition--on': mounted }"
      class="introduction__resume e-layoutGrid"
      style="transition-delay: 0.5s;"
    >
      <div class="introduction__resume__inner">
        <h1 v-kinesis="{ depth: 10 }" class="introduction__title">
          Hi, I'm Clément, a web developer.
        </h1>
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
    </div>
    <div class="introduction__more e-layoutGrid">
      <div
        :class="{ transition__fadeIn: true, 'transition--on': mounted }"
        style="transition-delay: 0.6s;"
        class="introduction__work"
      >
        <h2 v-kinesis="{ depth: 10 }" class="e-blockTitle">works</h2>
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
        style="transition-delay: 0.7s;"
        class="introduction__awards"
      >
        <h2 v-kinesis="{ depth: 10 }" class="e-blockTitle">recognitions</h2>
        <ul v-kinesis="{ depth: 5 }">
          <li>Awwwards <sub>x4</sub></li>
          <li>FWA <sub>x3</sub></li>
          <li>CSS Design Awards <sub>x5</sub></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import useWebGL from '@/hooks/use-webgl'

export default {
  data() {
    return {
      mounted: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.mounted = true
    }, 0)
  }
}
</script>

<style lang="scss">
.e-blockTitle {
  font-size: 10px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}

.introduction {
  font-size: 30px;
  line-height: 45px;

  &__resume {
    margin-bottom: 80px;

    &__inner {
      grid-column: span 4;
      @include media('>m') {
        grid-column: span 16;
      }
      @include media('>l') {
        grid-column: 3 / span 12;
      }
    }
  }

  &__more {
    row-gap: 40px;
  }

  &__work {
    grid-column: span 4;
    @include media('>m') {
      grid-column: span 8;
    }

    @include media('>l') {
      grid-column: 3 / span 4;
    }
  }

  &__awards {
    grid-column: span 4;
    @include media('>m') {
      grid-column: span 8;
    }

    @include media('>l') {
      grid-column: span 4;
    }
  }

  &__title {
    font-size: 40px;
    line-height: 55px;
  }

  sub {
    font-size: 20px;
    line-height: 35px;
  }

  &__positions {
    font-size: 30px;
    line-height: 45px;
  }
}
</style>
