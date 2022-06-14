<!--
  inline or block code
-->

<template>
  <!-- block of code -->
  <div v-if="flow === 'block'" class="block">
    <div v-if="heading" class="heading">{{ heading }}</div>
    <code ref="code" class="code">
      <slot />
    </code>
  </div>

  <!-- inline code -->
  <span v-else class="inline">
    <code ref="code" class="code">
      <slot />
    </code>
  </span>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";

interface Props {
  // flex display (whether container takes up full width)
  flow?: "inline" | "block";
  // text above, if in block flow
  heading?: string;
}

withDefaults(defineProps<Props>(), { flow: "inline", heading: "" });

interface Emits {
  // text content of code block
  (event: "text", text: string): void;
}

const emit = defineEmits<Emits>();

// code block element
const code = ref();

// get code content of block, including children textboxes
const textChange = () => {
  let text = "";
  const children = code.value?.children || [];
  for (const child of children) {
    text +=
      (child as HTMLElement).innerText || (child as HTMLInputElement).value;
  }

  emit("text", text);
};
onMounted(textChange);
onUpdated(textChange);
</script>

<style scoped lang="scss">
.code {
  background: $off-black;
  color: $white;
  border-radius: $rounded;
  font-style: normal;
  font-family: $mono;
  text-align: left;
  white-space: pre;
}

.code :deep(*) {
  font-family: $mono;
}

.inline .code {
  padding: 2px 5px;
}

.block {
  width: 100%;
}

.block .code {
  display: block;
  max-height: min(60vh, 600px);
  padding: 20px;
  overflow-x: auto;
  overflow-y: auto;
}

.heading {
  margin-left: 10px;
  margin-bottom: 5px;
  text-align: left;
  font-style: italic;
}
</style>
