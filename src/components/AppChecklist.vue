<!--
  list/group of checkboxes or radio buttons
-->

<template>
  <AppFlex gap="small">
    <AppCheckbox
      v-for="(item, index) in modelValue"
      :key="index"
      v-tippy="item.tooltip"
      :text="item.text"
      :model-value="item.checked"
      :type="single ? 'radio' : 'check'"
      @update:model-value="() => onChange(index)"
    />
  </AppFlex>
</template>

<script setup lang="ts">
import { cloneDeep } from "lodash";
import AppCheckbox from "./AppCheckbox.vue";

interface Option {
  text: string;
  checked?: boolean;
  tooltip?: string;
}

interface Props {
  // internal input state
  modelValue: Array<Option>;
  // whether to make radio/single select
  single?: boolean;
}

const props = withDefaults(defineProps<Props>(), { single: false });

interface Emits {
  (event: "update:modelValue", value: Array<Option>): void;
}

const emit = defineEmits<Emits>();

const onChange = (index: number) => {
  const newValue = cloneDeep(props.modelValue || []);

  // select only one
  if (props.single) {
    newValue.forEach((option) => (option.checked = false));
    newValue[index].checked = true;
  }
  // toggle
  else newValue[index].checked = !newValue[index].checked;

  emit("update:modelValue", newValue);
};
</script>
