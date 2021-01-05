<template>
  <div class="center" :vertical="vertical">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    vertical: Boolean
  }
});
</script>

<style scope lang="scss">
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
  @include trim-v-margins;

  & > * {
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
