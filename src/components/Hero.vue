<template>
  <!-- section with rotating icons and key stats text -->
  <div class="hero">
    <!-- left icon wheel -->
    <div class="hero_icons">
      <div class="hero_icon"><i class="fa-lg" :class="icon" /></div>
      <div class="hero_icon"><i class="fa-lg" :class="icon" /></div>
      <div class="hero_icon"><i class="fa-lg" :class="icon" /></div>
    </div>

    <!-- left text stats -->
    <div class="hero_text">
      <div><slot name="ATop"></slot></div>
      <div><slot name="ABottom"></slot></div>
    </div>

    <!-- right text stats -->
    <div class="hero_text">
      <div><slot name="BTop"></slot></div>
      <div><slot name="BBottom"></slot></div>
    </div>

    <!-- right icon wheel -->
    <div class="hero_icons">
      <div class="hero_icon"><i class="fa-lg" :class="icon" /></div>
      <div class="hero_icon"><i class="fa-lg" :class="icon" /></div>
      <div class="hero_icon"><i class="fa-lg" :class="icon" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // font awesome icon code
    icon: String
  }
});
</script>

<style scoped lang="scss">
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 40px;

  .hero_icons {
    position: relative;
    justify-self: center;
    align-self: center;

    .hero_icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;

      i {
        color: $theme-light;
      }
    }
  }

  .hero_icons:first-child {
    .hero_icon:nth-child(1) {
      @include circle(30deg, 20px);
    }
    .hero_icon:nth-child(2) {
      @include circle(150deg, 20px);
    }
    .hero_icon:nth-child(3) {
      @include circle(270deg, 20px);
    }
  }

  .hero_icons:last-child {
    .hero_icon:nth-child(1) {
      @include circle(90deg, 20px);
    }
    .hero_icon:nth-child(2) {
      @include circle(210deg, 20px);
    }
    .hero_icon:nth-child(3) {
      @include circle(330deg, 20px);
    }
  }

  @media (max-width: $phone) {
    grid-template-columns: 1fr 1fr;
  }

  .hero_text {
    text-align: center;

    & > div:first-child {
      font-size: 1.3rem;
    }

    & > div:last-child {
      font-size: 0.9rem;
    }
  }

  $spin: 10s linear forwards infinite;

  @keyframes cw {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes ccw {
    0% {
      transform: rotate(-0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  .hero_icons:first-child {
    animation: ccw $spin;
    i {
      animation: cw $spin;
    }
  }

  .hero_icons:last-child {
    animation: cw $spin;
    i {
      animation: ccw $spin;
    }
  }
}
</style>
