<!--
  basic text box input, single line or multi-line
-->

<template>
  <label class="label">
    <div class="container" :data-icon="!!icon">
      <textarea
        v-if="multi"
        class="textarea"
        :value="modelValue"
        :placeholder="placeholder"
        @input="onInput"
        @change="onChange"
      >
      </textarea>
      <input
        v-else
        class="input"
        :value="modelValue"
        :placeholder="placeholder"
        @input="onInput"
        @change="onChange"
      />
      <div class="icon">
        <AppIcon v-if="icon" :icon="icon" />
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { debounce } from "lodash";

interface Props {
  // state
  modelValue?: string;
  // placeholder string when nothing typed in
  placeholder?: string;
  // whether field is multi-line
  multi?: boolean;
  // optional side icon
  icon?: string;
}

defineProps<Props>();

interface Emits {
  // two-way binding value
  (event: "update:modelValue", value: string): void;
  // when input value change "submitted"/"committed" by user
  (event: "change", value: string): void;
}

const emit = defineEmits<Emits>();

// last on change value that was emitted
const last = ref<string | undefined>(undefined);

// when user types in box
function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
  debouncedOnChange(event);
}

// when user "commits" change to value, e.g. pressing enter, de-focusing, etc
function onChange(event: Event) {
  // cancel any pending calls
  debouncedOnChange.cancel();

  // if on change (for this value) has not already emitted
  const value = (event.target as HTMLInputElement).value;
  if (value !== last.value) {
    emit("change", value);
    last.value = value;
  }
}

// make instance-unique debounced version of on change func
const debouncedOnChange = debounce(onChange, 500);

// cancel any in-progress debounce
onBeforeUnmount(debouncedOnChange.cancel);
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  --height: 40px;
}

.container {
  position: relative;
  width: 100%;
}

.icon {
  position: absolute;
  right: 0;
  top: 0;
  width: var(--height);
  height: var(--height);
  display: flex;
  justify-content: center;
  align-items: center;
  color: $gray;
}

.input,
.textarea {
  width: 100%;
  background: $white;
  border: solid 2px $off-black;
  border-radius: $rounded;
  outline: none;
  transition: box-shadow $fast;
}

.input {
  height: var(--height);
  padding: 0 calc(var(--height) * 0.25);
  line-height: 1.7;
}

.textarea {
  min-width: 100%;
  max-width: 100%;
  min-height: calc(var(--height) * 2);
  height: calc(var(--height) * 4);
  padding: calc(var(--height) * 0.25);
  line-height: 1.7;
}

.container[data-icon="true"] {
  .input,
  .textarea {
    padding-right: calc(var(--height) * 0.85);
  }
}

.input:hover,
.input:focus,
.textarea:hover,
.textarea:focus {
  box-shadow: 0 0 0 2px $theme;
}
</style>
