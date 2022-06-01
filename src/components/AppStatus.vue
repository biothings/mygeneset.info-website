<!--
  block to show a status of a query, with an icon and text
-->

<template>
  <AppFlex class="status" :data-status="status">
    <AppIcon class="icon" :icon="icon" />
    <slot />
  </AppFlex>
</template>

<script setup lang="ts">
import { computed } from "vue";

// different status codes and their associated props
const statuses = {
  loading: { icon: "spinner" },
  success: { icon: "check-circle" },
  warning: { icon: "exclamation-circle" },
  error: { icon: "exclamation-triangle" },
} as const;

type Status = keyof typeof statuses;

interface Props {
  // type of status to show (affects icon and colors)
  status: Status;
}

const props = defineProps<Props>();

const icon = computed(() => statuses[props.status].icon);
</script>

<style scoped lang="scss">
.status {
  padding: 40px;
}

.status[data-status="loading"] .icon {
  color: $gray;
  animation: spin 2s linear infinite;
}

.status[data-status="success"] .icon {
  color: $green;
}

.status[data-status="warning"] .icon {
  color: $yellow;
}

.status[data-status="error"] .icon {
  color: $red;
}
</style>
