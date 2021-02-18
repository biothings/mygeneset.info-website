<template id="indent">
  <span class="pretty_indent" v-for="(value, index) in spaces" :key="index">{{
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
