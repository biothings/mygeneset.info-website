<template>
  <div v-if="title" class="code_title">{{ title }}</div>
  <code ref="code" class="code_block" :aria-label="ariaLabel">
    <slot></slot>
  </code>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    ariaLabel: String
  },
  methods: {
    getCode: function() {
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
.code_title {
  margin-bottom: -20px;
}
.code_block {
  display: block;
  margin: 20px 0;
  @include trim-v-margins;
  padding: 10px 20px;
  border-radius: 5px;
  background: $off-black;
  word-break: break-word;
  max-height: min(80vh, 300px);
  overflow-x: auto;
  overflow-y: auto;

  * {
    color: $white;
    font-family: $mono;
  }
}
</style>
