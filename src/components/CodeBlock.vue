<template>
  <!-- block of syntax-highlighted code -->
  <code ref="code" class="code_block">
    <slot></slot>
  </code>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    // get code content of block, including code input components
    getCode() {
      const code = this.$refs.code as HTMLElement;
      let text = "";
      const children = code.children;
      for (const child of children) {
        text +=
          (child as HTMLElement).innerText || (child as HTMLInputElement).value;
      }
      return text;
    }
  }
});
</script>

<style scope lang="scss">
.code_block {
  display: block;
  margin: 20px 0;
  @include trim-v-margins;
  padding: 10px 20px;
  border-radius: 5px;
  background: $off-black;
  word-break: break-word;
  max-height: min(80vh, 600px);
  overflow-x: auto;
  overflow-y: auto;

  * {
    color: $white;
    font-family: $mono;
  }
}
</style>
