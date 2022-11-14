<!--
  basic wrapper for a piece of info in a "details" section, with a heading and slot
-->

<template>
  <AppFlex class="detail" direction="col" gap="small" h-align="left">
    <div v-tippy="tooltip" class="heading">{{ heading }}</div>
    <slot />
  </AppFlex>
</template>

<script setup lang="ts">
interface Props {
  // heading to place above slot
  heading: string;
  // tooltip to put on heading
  tooltip?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.detail {
  text-align: left;
}

.heading {
  font-weight: $medium;
}
</style>
