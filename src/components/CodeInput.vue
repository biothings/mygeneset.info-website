<template>
  <!-- text input box to go inside code block -->
  <input
    class="code_input"
    @input="onInput"
    :value="value"
    type="text"
    :style="'width: ' + value.length + 'ch'"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // starting value
    defaultValue: String,
    // called when value changes. is provided value, can return sanitized value
    onChange: Function
  },
  data() {
    return {
      // current value
      value: this.defaultValue || ""
    };
  },
  methods: {
    // when value changes
    onInput(event: Event) {
      const input = event.target as HTMLInputElement;
      const value = input.value || "";
      let sanitized = value;
      if (this.onChange) sanitized = this.onChange(value) || value;
      this.value = sanitized;
    }
  }
});
</script>

<style scope lang="scss">
.code_input {
  display: inline-block;
  min-width: 1rem;
  text-align: center;
  margin: 0 2px;
  padding: 0;
  color: $yellow;
  border-bottom: solid 2px $yellow;
}
</style>
