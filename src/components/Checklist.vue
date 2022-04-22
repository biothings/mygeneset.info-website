<template>
  <!-- check or radio list -->
  <label
    v-for="(item, index) in modelValue"
    :key="index"
    v-tooltip="item.tooltip || ''"
  >
    <input
      :type="single ? 'radio' : 'checkbox'"
      :checked="item.checked"
      @input="onInput(index)"
      :name="group"
      :index="index"
    />
    <span>{{ item.label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { cloneDeep } from "lodash";

interface Option {
  label?: string;
  checked?: boolean;
  tooltip?: string;
}

export default defineComponent({
  props: {
    // whether to make radio/single select
    single: Boolean,
    // unique name for radio button group
    group: String,
    // internal input state
    modelValue: Object as PropType<Option[]>
  },
  methods: {
    // when value changes
    onInput(index: number) {
      const newValue = cloneDeep(this.modelValue || []);

      // select only one
      if (this.single) {
        newValue.forEach(option => (option.checked = false));
        newValue[index].checked = true;
      }
      // toggle
      else newValue[index].checked = !newValue[index].checked;

      this.$emit("update:modelValue", newValue);
    }
  }
});
</script>

<style scope lang="scss">
label {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 8px;
  }
}
</style>
