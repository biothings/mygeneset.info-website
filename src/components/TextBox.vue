<template>
  <div class="text_box">
    <!-- multi-line text area input -->
    <textarea
      v-if="expanded"
      :value="modelValue"
      @input="$emit('update:modelValue', split($event.target.value))"
      :placeholder="placeholder"
    />

    <!-- single-line text box input -->
    <input
      v-else
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', split($event.target.value))"
      :placeholder="placeholder"
    />

    <button v-if="multi" @click="expanded = !expanded">
      <i
        v-if="expanded"
        class="fas fa-minus"
        v-tooltip="'Switch to single line search'"
      ></i>
      <i
        v-else
        class="fas fa-bars"
        v-tooltip="'Switch to multi-line search'"
      ></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // placeholder text
    placeholder: String,
    // is multi-line enabled
    multi: Boolean,
    // input value internal state
    modelValue: String
  },
  data() {
    return {
      // is multi-line expanded
      expanded: false
    };
  },
  methods: {
    // split into lines by newlines, tabs, and commas
    split(value: string) {
      if (this.expanded) return value.split(/[\n|\r|\t|,]/).join("\n");
      else return value;
    }
  }
});
</script>

<style scope lang="scss">
.text_box {
  display: flex;
  position: relative;
  background: $white;
  border: solid $light-gray 2px;
  border-radius: 5px;
  transition: border-color $fast;

  &:hover {
    border-color: $black;
  }

  input {
    flex-grow: 1;
    width: 100%;
    min-height: 40px;
    padding: 0 10px;
  }

  textarea {
    flex-grow: 1;
    width: 100%;
    min-height: 120px;
    padding: 8px 10px;
  }

  button {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>
