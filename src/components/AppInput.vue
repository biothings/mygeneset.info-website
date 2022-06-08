<!--
  basic text box input, single line or multi-line
-->

<template>
  <label class="label">
    <div class="container">
      <textarea
        v-if="multi"
        ref="element"
        class="textarea"
        :value="Array.isArray(modelValue) ? modelValue.join('\n') : modelValue"
        :placeholder="placeholder"
        @input="(event) => onInput((event.target as HTMLInputElement).value.split('\n'))"
        @change="onChange"
      >
      </textarea>
      <input
        v-else
        ref="element"
        class="input"
        :value="Array.isArray(modelValue) ? modelValue.join(', ') : modelValue"
        :placeholder="placeholder"
        @input="(event) => onInput((event.target as HTMLInputElement).value)"
        @change="onChange"
      />
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
import { debounce } from "lodash";

interface Props {
  // state
  modelValue?: string | Array<string>;
  // placeholder string when nothing typed in
  placeholder?: string;
  // line mode
  mode?: "single" | "multi" | "switchable";
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "",
  mode: "single",
});

interface Emits {
  // two-way binding value
  (event: "update:modelValue", value: string | Array<string>): void;
  // when input value change "submitted"/"committed" by user
  (event: "change"): void;
}

const emit = defineEmits<Emits>();

// input element
const element = ref();

// whether field is multi-line
const multi = ref(props.mode === "multi");

// when mode switched, trigger input event as if user had typed
watch(multi, async () => {
  await nextTick();
  element.value.dispatchEvent(new Event("input"));
});

// when user types in box
const onInput = (value: string | Array<string>) => {
  console.log("on input", value);
  emit("update:modelValue", value);
  debouncedOnChange();
};

// when user "commits" change to value, e.g. pressing enter, de-focusing, etc
const onChange = () => {
  // cancel any pending calls
  debouncedOnChange.cancel();

  emit("change");
};

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

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  width: var(--height);
  height: var(--height);
  background: none;
  border: none;
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
  padding: calc(var(--height) * 0.25);
  line-height: 1.5;
}

.textarea {
  min-width: 100%;
  max-width: 100%;
  min-height: calc(var(--height) * 2);
  height: calc(var(--height) * 2);
  padding: calc(var(--height) * 0.25);
  line-height: 1.5;
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
