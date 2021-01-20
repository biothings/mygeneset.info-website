<template>
  <div class="field">
    <div>
      {{ name }}
      <i v-if="!disabled" class="fas fa-pencil-alt"></i>
    </div>
    <select
      v-if="options && options.length"
      :value="modelValue"
      @input="onInput"
      :disabled="disabled"
    >
      <option v-for="(option, index) in options" :key="index">
        {{ option }}
      </option>
    </select>
    <textarea
      ref="textarea"
      v-else
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
    placeholder: String,
    modelValue: String,
    disabled: Boolean,
    options: Array
  },
  mounted: function() {
    this.fitHeight(this.$refs.textarea as HTMLInputElement);
  },
  methods: {
    fitHeight: function(textarea: HTMLInputElement) {
      // remember window scroll position
      const prevScroll = window.scrollY;
      // temporarily enable textarea so we can get content height
      const prevDisabled = textarea.disabled;
      textarea.removeAttribute("disabled");
      // shrink to fit, but messes with window scroll position
      textarea.style.height = "0";
      // get content height
      textarea.style.height = textarea.scrollHeight + 1 + "px";
      // restore window scroll position
      window.scrollTo(0, prevScroll);
      // restore textarea disabled
      if (prevDisabled) textarea.setAttribute("disabled", "true");
    },
    onInput: function(event: Event) {
      const input = event.target as HTMLInputElement;
      this.$emit("update:modelValue", input.value);
      if (input.tagName.toLowerCase() === "textarea") this.fitHeight(input);
    }
  }
});
</script>

<style scoped lang="scss">
.field {
  margin: 10px 0;

  div {
    font-weight: $medium;
    margin-bottom: 5px;
  }

  textarea {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    max-height: 300px;
    margin: 0 -5px;
    padding: 5px 5px;
  }

  select {
    margin: 0 -5px;
    padding: 5px 5px;
  }

  i {
    margin-left: 5px;
    color: $accent-dark;
  }
}
</style>
