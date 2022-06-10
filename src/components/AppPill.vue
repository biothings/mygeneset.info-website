<!--
  simple, non-clickable (use button for clickable) pill shape with slot content
-->

<template>
  <div class="pill truncate">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.pill {
  background: $theme-pale;
  border-radius: 999px;
  padding: 0 8px;
  max-width: 150px;
}
</style>
