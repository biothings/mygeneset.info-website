<template>
  <LinkTo v-bind:to="link" class="portrait">
    <div class="portrait_image"><img v-bind:src="image" /></div>
    <div class="portrait_name">{{ name }}</div>
    <div class="portrait_role">{{ role }}</div>
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
  color: $black;

  & > * {
    display: flex;
  }

  .portrait_image {
    margin-bottom: 15px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 75px;
    }
  }

  .portrait_name {
    font-weight: $medium;
    margin-bottom: 3px;
  }

  &:hover {
    color: $accent-dark;
  }
}
</style>
