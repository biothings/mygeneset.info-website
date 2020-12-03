<template>
  <LinkTo v-bind:to="link" class="portrait">
    <img v-bind:src="image" />
    <span>{{ name }}</span>
    <span>{{ role }}</span>
  </LinkTo>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkTo from "@/components/LinkTo.vue";

export default defineComponent({
  props: {
    link: String,
    image: String,
    name: String,
    role: String
  },
  components: {
    LinkTo
  }
});
</script>

<style scoped lang="scss">
.portrait {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  text-decoration: none;

  span:first-of-type {
    font-weight: $medium;
    margin-top: 10px;
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 75px;
  }
}
</style>
