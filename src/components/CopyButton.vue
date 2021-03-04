<template>
  <!-- copy to clipboard button -->
  <Clickable
    :icon="copied ? 'fas fa-check' : 'fas fa-copy'"
    :text="copied ? 'Copied!' : 'Copy'"
    design="big"
    @click="copy"
    v-tooltip="`Copy ${subject || ''} to clipboard`"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Clickable from "@/components/Clickable.vue";

export default defineComponent({
  components: {
    Clickable
  },
  props: {
    // text content to write to clipboard
    text: String,
    // what the button copies, e.g. "response data". shown in tooltip.
    subject: String
  },
  data() {
    return {
      // "copied!" message on or off
      copied: false
    };
  },
  methods: {
    // copy text to clipboard
    async copy() {
      await window.navigator.clipboard.writeText(this.text || "");
      this.copied = true;
      window.setTimeout(() => (this.copied = false), 1000);
    }
  }
});
</script>
