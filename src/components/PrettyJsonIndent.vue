<template id="indent">
  <!-- indent for a line of JSON -->
  <span class="pretty_indent" v-for="(value, index) in spaces" :key="index">{{
    value
  }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // depth, or times to indent
    depth: Number
  },
  computed: {
    // convert depth to spaces
    spaces(): string[] {
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
