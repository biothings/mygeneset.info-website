<template>
  <!-- editable text box or checkbox menu -->
  <div class="field">
    <!-- field title -->
    <div>
      {{ name }}
      <i v-if="!disabled" class="fas fa-pencil-alt"></i>
    </div>

    <!-- checkbox -->
    <input
      v-if="type === 'checkbox'"
      :checked="modelValue ? true : false"
      @input="onInput"
      type="checkbox"
      :disabled="disabled"
    />

    <!-- text box -->
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
    // title
    name: String,
    // text in text box when nothing typed in
    placeholder: String,
    // is field editable
    disabled: Boolean,
    // field type, "" | "checkbox"
    type: String,
    // field value internal state
    modelValue: [String, Boolean]
  },
  mounted() {
    const textarea = this.$refs.textarea as HTMLInputElement;
    if (textarea) this.fitHeight(textarea);
  },
  methods: {
    // fit height of text box to content
    fitHeight(textarea: HTMLInputElement) {
      // remember window scroll position
      const prevScroll = window.scrollY;
      // temporarily enable textarea so we can get content height
      const prevDisabled = textarea.disabled;
      textarea.removeAttribute("disabled");
      // shrink to fit, but messes with window scroll position
      textarea.style.height = "0";
      // expand to content height
      textarea.style.height = textarea.scrollHeight + 2 + "px";
      // restore window scroll position
      window.scrollTo(0, prevScroll);
      // restore textarea disabled
      if (prevDisabled) textarea.setAttribute("disabled", "true");
    },
    // when value changes
    onInput(event: Event) {
      const input = event.target as HTMLInputElement;
      const value = this.type === "checkbox" ? input.checked : input.value;
      this.$emit("update:modelValue", value);
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

  input {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    appearance: none;
    width: 20px;
    height: 20px;
    margin: 5px;
    padding: 0;
    border-radius: 5px;
    background: none;
    color: transparent;
    border: solid 2px $theme;
    cursor: pointer;

    &:after {
      content: "\f00c";
      position: absolute;
      font-family: "Font Awesome 5 Free";
      font-size: 14px;
      font-weight: 900;
    }

    &:checked {
      background: $theme;
      color: $white;
    }
  }

  i {
    margin-left: 5px;
    color: $theme;
  }
}
</style>
