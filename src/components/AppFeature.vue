<!--
  product feature with a tile with icon, text, and description, for home page
-->

<template>
  <div class="feature">
    <AppIcon class="icon" :icon="icon" />
    <div class="title">{{ title }}</div>
    <div class="description">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  // font awesome icon code
  icon: string;
  // text in bold under icon
  title: string;
  // text under title
  description: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.feature {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;

  .icon {
    color: $theme;
    font-size: 3rem;
  }

  .title {
    font-weight: $medium;
  }
}
</style>
