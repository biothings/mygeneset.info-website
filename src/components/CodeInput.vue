<template>
  <input
    class="code_input"
    @input="onInput"
    :value="value"
    :placeholder="placeholder"
    :name="name"
    :type="type || 'text'"
    :style="'width: ' + value.length + 'ch'"
  />
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";

export default defineComponent({
  props: {
    defaultValue: String,
    placeholder: String,
    name: String,
    type: String,
    sanitize: Function,
    onChange: Function
  },
  data: function() {
    return {
      value: this.defaultValue || ""
    };
  },
  methods: {
    onInput: function(event: Event) {
      const input = event.target as HTMLInputElement;
      if (this.sanitize) {
        const oldValue = this.value;
        const newValue = this.sanitize(input.value);
        this.value = newValue;
        if (newValue === oldValue) {
          const index = (input.selectionStart || 1) - 1;
          this.$forceUpdate();
          nextTick(() => input.setSelectionRange(index, index));
        }
      }
      if (this.onChange) this.onChange(event);
    }
  }
});
</script>

<style scope lang="scss">
.code_input {
  display: inline-block;
  min-width: 2rem;
  margin: 0 2px;
  padding: 0;
  color: $yellow;
  border-bottom: solid 2px $yellow;
}
</style>
