<template>
  <input
    class="code_input"
    @input="onInput"
    v-bind:value="value"
    v-bind:placeholder="placeholder"
    v-bind:name="name"
    v-bind:type="type || 'text'"
    v-bind:style="'width: ' + value.length + 'ch'"
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
    sanitize: Function
  },
  data: function() {
    return {
      value: this.defaultValue || ""
    };
  },
  methods: {
    onInput: function(event: Event) {
      if (this.sanitize) {
        const oldValue = this.value;
        const newValue = this.sanitize(event);
        this.value = newValue;
        if (newValue === oldValue) {
          const input = event.target as HTMLInputElement;
          const index = (input.selectionStart || 1) - 1;
          this.$forceUpdate();
          nextTick(() => input.setSelectionRange(index, index));
        }
      }
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
