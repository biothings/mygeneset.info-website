<template>
  <div class="quick_links">
    <LinkTo to="https://github.com/biothings/mygeneset.info/"
      ><i class="fab fa-github fa-fw"
    /></LinkTo>
    <LinkTo to="https://twitter.com/mygenesetinfo"
      ><i class="fab fa-twitter fa-fw"
    /></LinkTo>
    <LinkTo to="about#contact"><i class="far fa-envelope fa-fw"/></LinkTo>
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
.quick_links {
  text-align: left;

  & > * {
    display: inline-block;
    padding: 5px;
    color: $black;

    &:hover {
      color: $accent-dark;
    }
  }
}
</style>
