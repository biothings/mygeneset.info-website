<!--
  list/group of checkboxes or radio buttons
-->

<template>
  <AppCheckbox
    v-for="(item, index) in modelValue"
    :key="index"
    v-tippy="item.tooltip"
    :text="item.text"
    :model-value="item.checked"
    :type="single ? 'radio' : 'check'"
    :name="name"
    @update:model-value="() => onInput(index)"
  />
</template>

<script setup lang="ts">
import { cloneDeep, debounce, isEqual } from "lodash";
import { ref } from "vue";
import AppCheckbox from "./AppCheckbox.vue";

export interface Option {
  // text to show for option
  text: string;
  // whether option is selected
  checked?: boolean;
  // tooltip to show on hover of option
  tooltip?: string;

  // allow any other params (will be ignored)
  [key: string]: unknown;
}

export type Options = Array<Option>;

interface Props {
  // internal input state
  modelValue: Options;
  // name for check/radio group, needed for radio groups, good practice otherwise
  name: string;
  // whether to make radio/single select
  single?: boolean;
}

const props = withDefaults(defineProps<Props>(), { single: false });

interface Emits {
  // two-way binding value
  (event: "update:modelValue", value: Array<Option>): void;
  // when input value change "submitted"/"committed" by user
  (event: "change"): void;
}

const emit = defineEmits<Emits>();

// when user toggles any of the boxes
const onInput = (index: number) => {
  const newValue = cloneDeep(props.modelValue || []);

  // select only one
  if (props.single) {
    newValue.forEach((option) => (option.checked = false));
    newValue[index].checked = true;
  }
  // toggle
  else newValue[index].checked = !newValue[index].checked;

  emit("update:modelValue", newValue);
  debouncedOnChange(newValue);
};

// last on change value that was emitted
const last = ref<Props["modelValue"]>();

// when user "commits" change to value
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
const debouncedOnChange = debounce(onChange, 1000);
</script>
