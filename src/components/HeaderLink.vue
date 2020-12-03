<template>
  <LinkTo class="header_link" v-bind:to="to">
    <i v-if="icon" v-bind:class="icon" />
    <span>{{ text }}</span>
  </LinkTo>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkTo from "@/components/LinkTo.vue";

export default defineComponent({
  props: {
    to: String,
    text: String,
    icon: String
  },
  components: {
    LinkTo
  }
});
</script>

<style scope lang="scss">
.header_link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: $black !important;
  text-decoration: none;

  span {
    position: relative;
  }

  span:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: $black;
    opacity: 0;
    transition: opacity $fast;
  }

  &:hover span:after {
    opacity: 1;
  }

  @media (max-width: $tablet) {
    padding: 10px;
  }
}
</style>
