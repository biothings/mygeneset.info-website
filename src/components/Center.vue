<template>
  <slot v-if="hide"></slot>
  <div v-else class="center" :vertical="vertical" :style="`--width: ${width}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    vertical: Boolean,
    width: String,
    hide: Boolean
  }
});
</script>

<style scope lang="scss">
.center {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 30px auto;
  text-align: center;
  @include trim-v-margins;

  & > * {
    width: var(--width);
    max-width: 100%;
    margin: 10px;
  }

  &[vertical="true"] {
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;

    & > * {
      margin: 10px 0;
      @include trim-v-margins;
    }
  }
}
</style>
