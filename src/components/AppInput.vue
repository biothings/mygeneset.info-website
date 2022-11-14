<!--
  basic text box input, single line or multi-line
-->

<template>
  <label class="label">
    <textarea
      v-if="multi"
      ref="element"
      class="textarea"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @change="onInput"
    >
    </textarea>
    <input
      v-else
      ref="element"
      class="input"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @change="onInput"
    />
    <div class="buttons">
      <button
        v-if="clearable"
        v-tippy="'Clear text'"
        class="button"
        @click="clear"
      >
        <AppIcon icon="times" />
      </button>
      <button
        v-if="mode === 'switchable'"
        v-tippy="
          multi ? 'Switch to single line input' : 'Switch to multi-line input'
        "
        class="button"
        @click="multi = !multi"
      >
        <AppIcon :icon="multi ? 'minus' : 'bars'" />
      </button>
    </div>
  </label>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import { cloneDeep, debounce, isEqual } from "lodash";

interface Props {
  // state
  modelValue?: string;
  // placeholder string when nothing typed in
  placeholder?: string;
  // line mode
  mode?: "single" | "multi" | "switchable";
  // whether clear button should show
  clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "",
  mode: "single",
  clearable: true,
});

interface Emits {
  // two-way binding value
  (event: "update:modelValue", value: Props["modelValue"]): void;
  // when input value change "submitted"/"committed" by user
  (event: "change"): void;
}

const emit = defineEmits<Emits>();

// input element
const element = ref();

// whether field is multi-line
const multi = ref(props.mode === "multi");

// last on change value that was emitted
const last = ref<Props["modelValue"]>("");

// when mode switched, trigger input event as if user had typed
watch(multi, async () => {
  await nextTick();
  element.value.dispatchEvent(new Event("input"));
});

// clear text
const clear = () => {
  const input = element.value as HTMLInputElement;
  input.value = "";
  input.dispatchEvent(new Event("input"));
  input.dispatchEvent(new Event("change"));
};

// when user types in box
const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
  debouncedOnChange(value);
};

// when user "commits" change to value, e.g. pressing enter, de-focusing, etc
const onChange = (value: Props["modelValue"]) => {
  // cancel any pending calls
  debouncedOnChange.cancel();

  // if on change (for this value) has not already emitted
  if (!isEqual(value, last.value)) {
    emit("change");
    last.value = cloneDeep(value);
  }
};

// make instance-unique debounced version of on change func
const debouncedOnChange = debounce(onChange, 500);

// cancel any in-progress debounce
onBeforeUnmount(debouncedOnChange.cancel);
</script>

<style scoped lang="scss">
.label {
  display: flex;
  width: 100%;
  max-width: 100%;
  --height: 40px;
  background: $white;
  border: solid 2px $off-black;
  border-radius: $rounded;
  transition: box-shadow $fast;

  &:focus-within {
    box-shadow: 0 0 0 2px $theme;
  }
}

.input,
.textarea {
  flex-grow: 1;
  background: none;
  border: none;
  outline: none;
}

.input {
  height: var(--height);
  padding: calc(var(--height) * 0.25);
  line-height: 1.5;
}

.textarea {
  min-height: calc(var(--height) * 2);
  height: calc(var(--height) * 2);
  padding: calc(var(--height) * 0.25);
  line-height: 1.5;
}

.buttons {
  display: flex;
  margin-right: calc(0.15 * var(--height));
  height: var(--height);
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(0.75 * var(--height));
  height: var(--height);
  background: none;
  border: none;
  padding: 0;
  transition: color $fast;

  &:hover,
  &:focus {
    color: $theme;
  }
}
</style>
