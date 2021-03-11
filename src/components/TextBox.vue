<template>
  <div class="text_box">
    <!-- multi-line text area input -->
    <textarea
      v-if="expanded"
      :value="modelValue"
      @input="input"
      :placeholder="placeholder"
      v-tooltip="'Paste newline-, tab-, or comma-separated list'"
    />

    <!-- single-line text box input -->
    <input
      v-else
      type="text"
      :value="modelValue"
      @input="input"
      :placeholder="placeholder"
    />

    <button
      v-if="multi"
      @click="expanded = !expanded"
      v-tooltip="
        expanded
          ? 'Switch to single line search'
          : 'Switch to multi-line search'
      "
    >
      <i v-if="expanded" class="fas fa-minus"></i>
      <i v-else class="fas fa-bars"></i>
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
  emits: ["expand", "update:modelValue"],
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
    },
    // on input
    input(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("update:modelValue", this.split(target.value));
    }
  },
  watch: {
    expanded() {
      this.$emit("expand", this.expanded);
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
