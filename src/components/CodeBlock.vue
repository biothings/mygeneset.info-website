<template>
  <span v-if="title">{{ title }}</span>
  <code v-bind:aria-labe="ariaLabel">
    <slot></slot>
  </code>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    ariaLabel: String
  }
});
</script>

<style scope lang="scss">
code {
  display: block;
  padding: 10px 20px;
  border-radius: 5px;
  background: $dark-gray;
  word-break: break-word;

  * {
    color: $white;
    font-family: $mono;
  }
}
</style>
