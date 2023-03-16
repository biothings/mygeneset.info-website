<!--
  special textbox input that goes inside of a code block
-->

<template>
  <input
    class="input"
    :value="modelValue"
    type="text"
    :style="{ width: modelValue.length + 0.5 + 'ch' }"
    @input="onInput"
  />
</template>

<script setup lang="ts">
interface Props {
  // internal input state
  modelValue: string;
}

defineProps<Props>();

interface Emits {
  // two-way binding value
  (event: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emits>();

// when text value changes
const onInput = (event: Event) =>
  emit("update:modelValue", (event.target as HTMLInputElement).value);
</script>

<style scoped lang="scss">
.input {
  display: inline-block;
  min-width: 1rem;
  text-align: center;
  margin: 0 2px;
  color: $yellow;
  background: none;
  border: none;
  border-bottom: solid 2px $yellow;
}
</style>
