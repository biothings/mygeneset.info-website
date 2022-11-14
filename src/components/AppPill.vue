<!--
  simple, non-clickable (use button for clickable) pill shape with slot content
-->

<template>
  <div class="pill">
    <AppIcon v-if="icon" :icon="icon" />
    <span class="truncate">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  // font awesome icon code
  icon?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.pill {
  display: flex;
  align-items: center;
  gap: 5px;
  background: $theme-pale;
  border-radius: 999px;
  padding: 0 8px;
  max-width: 150px;
}
</style>
