<!--
  checkbox with arbitrary content (slot)
-->

<template>
  <label class="label">
    <input
      class="input"
      :type="type === 'radio' ? 'radio' : 'checkbox'"
      name="checklist-group"
      :checked="modelValue"
      @change="onChange"
    />
    <AppIcon
      v-if="type === 'radio'"
      :icon="modelValue ? 'circle-dot' : 'circle'"
      class="icon"
    />
    <AppIcon
      v-else
      :icon="modelValue ? 'square-check' : 'square'"
      class="icon"
    />
    <span class="text">{{ text }}</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  // checked state
  modelValue?: boolean;
  // text to show in label
  text: string;
  // type
  type?: "check" | "radio";
}

withDefaults(defineProps<Props>(), { type: "check" });

interface Emits {
  (event: "update:modelValue", checked: boolean): void;
}

const emit = defineEmits<Emits>();

// when checkbox value changes
const onChange = (event: Event) =>
  emit("update:modelValue", (event?.target as HTMLInputElement).checked);
</script>

<style scoped lang="scss">
.label {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: $rounded;
  cursor: pointer;
  transition: background $fast;

  &:focus-within,
  &:hover {
    background: $light-gray;
  }
}

.icon {
  color: $theme;
  font-size: 1.2rem;
}

.input {
  position: absolute;
  appearance: none;
}
</style>
