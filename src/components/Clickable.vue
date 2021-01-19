<template>
  <component
    :is="component"
    class="clickable"
    :to="to"
    :design="design"
    :title="title"
    :aria-label="title"
  >
    <i v-if="icon" :class="icon" />
    <span v-if="text">{{ text }}</span>
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkTo from "@/components/LinkTo.vue";

export default defineComponent({
  props: {
    to: String,
    icon: String,
    text: String,
    design: String,
    title: String
  },
  components: {
    LinkTo
  },
  data() {
    return {
      component: this.to ? "LinkTo" : "button"
    };
  }
});
</script>

<style scope lang="scss">
.clickable {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  text-decoration: none;
  background: $accent;
  color: $black;
  transition: background $fast, opacity $fast, filter $fast;

  &:hover,
  &:focus {
    background: $accent-light;
  }

  &[design="plain"] {
    background: none;
    color: $accent-dark;
    padding: 5px 10px;
  }

  &[design="slim"] {
    height: 30px;
    padding: 5px 10px;
  }

  &[design="big"] {
    height: 40px;
    padding: 10px 20px;

    &:hover,
    &:focus {
      background: $accent-light;
    }
  }

  span {
    @include truncate;
  }

  &[disabled] {
    pointer-events: none;
    filter: saturate(0);
    opacity: 0.5;
  }
}
</style>
