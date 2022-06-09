<!--
  section with rotating icons and key stats text
-->

<template>
  <div class="hero">
    <!-- left icon wheel -->
    <div class="icons">
      <div
        v-for="(spoke, index) in spokes"
        :key="index"
        class="icon"
        :style="{ transform: `translate(${spoke.x}px, ${spoke.y}px)` }"
      >
        <AppIcon :icon="icon" />
      </div>
    </div>

    <!-- left text -->
    <div class="text">
      <div><slot name="aTop"></slot></div>
      <div><slot name="aBottom"></slot></div>
    </div>

    <!-- right text -->
    <div class="text">
      <div><slot name="bTop"></slot></div>
      <div><slot name="bBottom"></slot></div>
    </div>

    <!-- right icon wheel -->
    <div class="icons">
      <div
        v-for="(spoke, index) in spokes"
        :key="index"
        class="icon"
        :style="{ transform: `translate(${spoke.x}px, ${spoke.y}px)` }"
      >
        <AppIcon :icon="icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sin, cos } from "@/util/math";

// angles of spokes in icon wheel
const angles = [0, 120, 240];
// radius of wheel
const radius = 15;

// make spokes with all details needed to render
const spokes = angles.map((angle) => {
  const x = sin(angle) * radius;
  const y = -cos(angle) * radius;

  return { x, y };
});

interface Props {
  // font awesome icon code
  icon: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
$breakpoint: 500px;

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
}

@media (max-width: $breakpoint) {
  .hero {
    grid-template-columns: 1fr 1fr;
  }
}

.text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  text-align: center;

  & > div:first-child {
    font-size: 1.3rem;
  }

  & > div:last-child {
    font-size: 0.9rem;
  }
}

.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: $theme;
  animation: spin 10s linear infinite reverse;
}

.icon {
  position: absolute;

  svg {
    animation: spin 10s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
