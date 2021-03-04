<template>
  <!-- text links in footer -->
  <div class="info_links">
    <LinkTo to="about#terms">Terms of Use</LinkTo> |
    <LinkTo to="about#cite">How to Cite</LinkTo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkTo from "@/components/LinkTo.vue";

export default defineComponent({
  components: {
    LinkTo
  }
});
</script>

<style scoped lang="scss">
.info_links {
  text-align: center;
}
</style>
