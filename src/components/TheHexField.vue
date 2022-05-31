<!--
  cool visualization of hexagons in background of header
-->

<template>
  <div class="field">
    <div
      class="view"
      :style="{
        transform: `translateZ(0px) rotateX(${xAngle}deg) rotateY(${yAngle}deg)`,
      }"
    >
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="cell"
        :style="{
          transform: `translateX(${cell.x}px) translateY(${cell.y}px) translateZ(${cell.z}px)`,
          opacity: cell.strength,
        }"
      >
        <img
          src="@/assets/hexagon.svg"
          :style="{ animationDelay: cell.strength * 3 + 's' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "@vueuse/core";

// hexagonal grid properties

// distance between grid cells
const d = 100;
// hexagon apothem, side to side
const a = (d * Math.sqrt(3)) / 2;
// cols of hexagons in each direction
const cols = Math.min(Math.round(window.innerWidth / 2 / d) + 2, 20);
// rows of hexagons in each direction
const rows = Math.min(Math.round(window.innerHeight / 2 / d) + 2, 5);

interface Cell {
  // position
  x: number;
  y: number;
  z: number;
  // color/opacity strength
  strength: number;
}

// generate hex grid of cells
const cells: Array<Cell> = [];
for (let x = -cols; x <= cols; x++)
  for (let y = -rows; y <= rows; y++) {
    const offset = y % 2 === 0;
    const strength = Math.abs(x / cols);
    const show = Math.random() > strength;
    if (show)
      cells.push({
        x: x * a + (offset ? a / 2 : 0),
        y: y * d * 0.75,
        z: 0,
        strength,
      });
  }

// viewing angle
const xAngle = ref(0);
const yAngle = ref(0);

// when mouse moves
const onMouseMove = (event: MouseEvent) => {
  yAngle.value = -(0.5 - event.clientX / window.innerWidth) * 30;
  xAngle.value = (0.5 - event.clientY / window.innerHeight) * 30;
};

useEventListener("mousemove", onMouseMove);
</script>

<style scoped lang="scss">
.field {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: opacity $slow;
}

.view {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
}

.cell {
  position: absolute;
  transform-style: preserve-3d;

  img {
    width: 90px;
    height: 90px;
    transform: translate(-45px, -45px);
    animation: pulse 3s forwards infinite;
    opacity: 0;

    @keyframes pulse {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
}
</style>
