<template id="indent">
  <span class="pretty_indent" v-for="(value, key) in spaces" :key="key">{{
    value
  }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    depth: Number
  },
  computed: {
    spaces: function(): string[] {
      return Array(this.depth || 0)
        .fill("")
        .map(() => "  ");
    }
  }
});
</script>

<style scope lang="scss">
.pretty_indent {
  white-space: pre;
  border-left: solid 2px $dark-gray;
}
</style>
