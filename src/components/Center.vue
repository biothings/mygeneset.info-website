<template>
  <!-- horizontally or vertically centered group of items -->
  <div class="center" :vertical="vertical" :style="`--width: ${width}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // layout items vertically or horizontally
    vertical: Boolean,
    // width of each item
    width: String
  }
});
</script>

<style scope lang="scss">
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px auto;
  text-align: center;
  @include trim-v-margins;

  br {
    content: "";
    margin: 0;
    flex-basis: 100%;
  }

  & > * {
    min-width: min(100%, var(--width));
    max-width: 100%;
    margin: 10px;
  }

  &[vertical="true"] {
    flex-direction: column;
    flex-wrap: nowrap;

    & > * {
      margin: 10px 0;
      @include trim-v-margins;
    }
  }
}
</style>
