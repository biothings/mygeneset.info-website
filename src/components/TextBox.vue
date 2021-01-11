<template>
  <input
    class="text_box"
    :placeholder="placeholder"
    :name="name"
    :type="type || 'text'"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    placeholder: String,
    name: String,
    type: String,
    modelValue: String
  }
});
</script>

<style scope lang="scss">
.text_box {
  height: 40px;
  padding: 0 10px;
  background: $white;
  border: solid $light-gray 2px;
  border-radius: 5px;
  transition: border-color $fast;

  &:hover,
  &:focus {
    border-color: $black;
  }
}
</style>
