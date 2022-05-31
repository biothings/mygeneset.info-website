<!--
  looks like a button and either does something (<button>) or goes somewhere (<a>)
-->

<template>
  <component
    :is="component"
    class="button"
    :to="to"
    :data-design="design"
    :data-selected="selected"
    @click="onClick"
  >
    <AppIcon v-if="icon" :icon="icon" />
    <span v-if="copied">Copied!</span>
    <span v-else-if="text">{{ text }}</span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  // text to show
  text?: string;
  // icon to show
  icon?: string;
  // location to link to
  to?: string;
  // on click action
  click?: (event: MouseEvent) => void;
  // visual design
  design?: "plain" | "slim" | "big";
  // whether selected or not
  selected?: boolean;
  // text content to copy to clipboard
  copy?: string;
}
const props = withDefaults(defineProps<Props>(), {
  text: "",
  icon: "",
  to: "",
  click: () => null,
  design: "big",
  selected: undefined,
  copy: "",
});

// type of component to render
const component = computed(() => (props.to ? "AppLink" : "button"));

// copied notification state
const copied = ref(false);

// when user clicks on button
const onClick = async (event: MouseEvent) => {
  // run specified click func
  if (props.click) props.click(event);

  // copy specified text to clipboard and notify user
  if (props.copy) {
    await window.navigator.clipboard.writeText(props.copy || "");
    copied.value = true;
    window.setTimeout(() => (copied.value = false), 1000);
  }
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: solid 2px transparent;
  border-radius: $rounded;
  text-decoration: none;
  background: $theme-light;
  color: $black;
  transition: background $fast, opacity $fast, filter $fast, border $fast;

  &:hover,
  &:focus {
    background: none;
    border-color: $theme-light;
  }

  &[data-design="plain"] {
    background: none;
    color: $theme;
    padding: 5px 10px;
  }

  &[data-design="slim"] {
    height: 30px;
    padding: 5px 10px;
  }

  &[data-design="big"] {
    min-width: min(200px, 100%);
    min-height: 40px;
    padding: 10px 20px;
  }

  &[data-selected="false"] {
    background: $theme-pale;
    color: $black;
  }

  &[data-selected="true"] {
    background: $theme-light;
    color: $black;
  }
}
</style>
