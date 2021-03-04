<template>
  <!-- single line text box input -->
  <input
    class="text_box"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // input value internal state
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
