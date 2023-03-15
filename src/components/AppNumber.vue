<template>
  <label>
    {{ text }}:
    <input
      :value="modelValue"
      class="number"
      type="number"
      @change="(event: Event) => emit('update:modelValue', Number((event?.target as HTMLInputElement).value) || 0)"
    />
  </label>
</template>

<script setup lang="ts">
interface Props {
  // internal input state
  modelValue: number;
  // text to show in label
  text: string;
}

defineProps<Props>();

interface Emits {
  // two-way binding value
  (event: "update:modelValue", value: number): void;
}

const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
.number {
  width: 100px;
  margin: 0;
  padding: 5px 10px;
  border: solid 2px $theme;
  border-radius: $rounded;
  color: $black;
  font-size: 1rem;
}
</style>
