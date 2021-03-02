<template>
  <div
    class="center"
    :vertical="vertical"
    :compact="compact"
    :style="`--width: ${width}`"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    vertical: Boolean,
    width: String,
    compact: Boolean
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
