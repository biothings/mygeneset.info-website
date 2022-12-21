<!--
  cookie warning banner
-->

<template>
  <AppFlex v-if="show" class="banner" direction="col">
    <p>
      This website uses cookies to keep you logged in (if you are a registered
      user) and for analytics purposes. By continuing to use this website, you
      consent to using these cookies.
    </p>
    <AppButton text="Don't show again" icon="times" @click="show = false" />
  </AppFlex>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";

const show = useStorage("cookie-banner", true);
</script>

<style lang="scss" scoped>
.banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40px max(40px, calc((100% - $section) / 2));
  background: $theme-pale;
  text-align: center;
  box-shadow: 0 0 10px $gray;
  z-index: 999;
}
</style>
