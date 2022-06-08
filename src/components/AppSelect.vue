<template>
  <select
    :value="modelValue"
    class="select"
    @change="(event: Event) => emit('update:modelValue', (event?.target as HTMLSelectElement).value || '')"
  >
    <option v-for="(option, index) in options" :key="index" :value="option.key">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
type Option = string;

type Options = Array<{
  // text to show for option
  text: string;
  // unique key/value for option
  key: string;

  // allow any other params, will be ignored
  [key: string]: unknown;
}>;

interface Props {
  // internal select state
  modelValue: Option;
  // options to select from
  options: Options;
}

defineProps<Props>();

interface Emits {
  (event: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
.select {
  margin: 0;
  padding: 2px 5px;
  border: solid 2px $theme;
  border-radius: $rounded;
  color: $black;
  font-size: 1rem;
}
</style>
