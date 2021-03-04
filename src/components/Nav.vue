<template>
  <!-- header navigation section -->
  <nav>
    <HeaderLink to="/browse" text="Browse" />
    <HeaderLink to="/build" text="Build" />
    <HeaderLink to="/api" text="API" />
    <HeaderLink to="/about" text="About" />
    <HeaderLink to="https://biothings.io" text="BioThings" />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLink from "@/components/HeaderLink.vue";

export default defineComponent({
  components: {
    HeaderLink
  }
});
</script>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: $phone) {
    justify-content: center;
    flex-direction: column;
    flex-basis: 100%;

    &[expanded="false"] {
      display: none;
    }

    & > * {
      width: 100%;
    }
  }
}
</style>
