<template>
  <!-- button or link with various designs -->
  <component :is="component" class="clickable" :to="to" :design="design">
    <i v-if="icon" :class="icon" />
    <span v-if="text">{{ text }}</span>
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkTo from "@/components/LinkTo.vue";

export default defineComponent({
  props: {
    // link target
    to: String,
    // font awesome icon code
    icon: String,
    // text to display
    text: String,
    // plain, slim, or big
    design: String
  },
  components: {
    LinkTo
  },
  data() {
    return {
      // whether to render <a> (router link) or <button>
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
  background: $theme-light;
  color: $black;
  transition: background $fast, opacity $fast, filter $fast;

  &:hover,
  &:focus {
    background: $theme-pale;
  }

  &[design="plain"] {
    background: none;
    color: $theme;
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
      background: $theme-pale;
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

  &[selected="false"] {
    background: $theme-pale;
    color: $black;
  }

  &[selected="true"] {
    background: $theme-light;
    color: $black;
  }
}
</style>
