<!--
  list/group of checkboxes or radio buttons
-->

<template>
  <AppFlex gap="small">
    <label
      v-for="(item, index) in modelValue"
      :key="index"
      v-tippy="item.tooltip || ''"
      class="label"
    >
      <input
        class="input"
        :type="single ? 'radio' : 'checkbox'"
        name="checklist-group"
        :index="index"
        :checked="item.checked"
        @change="onInput(index)"
      />
      <AppIcon
        v-if="single"
        :icon="item.checked ? 'circle-dot' : 'circle'"
        class="icon"
      />
      <AppIcon
        v-else
        :icon="item.checked ? 'square-check' : 'square'"
        class="icon"
      />
      <span class="text">{{ item.label }}</span>
    </label>
  </AppFlex>
</template>

<script setup lang="ts">
import { cloneDeep } from "lodash";

interface Option {
  label?: string;
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
};
</script>

<style scoped lang="scss">
.label {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: $rounded;
  transition: background $fast;

  &:focus-within,
  &:hover {
    background: $light-gray;
  }
}

.icon {
  color: $theme;
}

.text {
  margin-left: 8px;
}

.input {
  appearance: none;
}
</style>
