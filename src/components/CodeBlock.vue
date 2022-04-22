<template>
  <!-- block of syntax-highlighted code -->
  <div class="code">
    <div>{{ heading }}</div>
    <code ref="code">
      <slot></slot>
    </code>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // heading above block
    heading: String
  },
  methods: {
    // get code content of block, including code input components
    getCode(): string {
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
.code {
  margin: 20px 0;

  & > div {
    margin: 5px 10px;
  }

  & > code {
    display: block;
    @include trim-v-margins;
    padding: 10px 20px;
    border-radius: 5px;
    word-break: break-word;
    max-height: min(60vh, 600px);
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
