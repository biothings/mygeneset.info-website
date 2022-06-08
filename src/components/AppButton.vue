<!--
  looks like a button and either does something (<button>) or goes somewhere (<a>)
-->

<template>
  <component
    :is="component"
    class="button"
    :to="to"
    :data-fill="fill"
    :data-size="size"
    :data-color="color"
    :data-slot="!!$slots.default"
    :data-icon="!!icon"
    :data-text="!!text"
    @click="onClick"
  >
    <slot />
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
  // fill design of button
  fill?: "hollow" | "filled";
  // size of button
  size?: "fitted" | "big";
  // color
  color?: "normal" | "important";
  // text content to copy to clipboard
  copy?: string;
}
const props = withDefaults(defineProps<Props>(), {
  text: "",
  icon: "",
  to: "",
  click: () => null,
  fill: "hollow",
  size: "fitted",
  color: "normal",
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
  transition: background $fast, opacity $fast, filter $fast, border $fast;

  &:hover,
  &:focus {
    background: none !important;
    border-color: $theme-light;
  }

  &[data-fill="hollow"] {
    background: none;
    color: $theme;
  }

  &[data-fill="filled"] {
    background: $theme-light;
    color: $black;
  }

  &[data-size="fitted"] {
    padding: 5px 10px;
  }

  &[data-size="big"] {
    min-width: min(200px, 100%);
    min-height: 40px;
    padding: 10px 20px;
  }

  &[data-slot="false"][data-text="false"][data-icon="true"] {
    width: 30px;
    height: 30px;
    padding: 0;
  }

  &[data-color="important"] {
    &[data-fill="hollow"] {
      color: $red;
      border-color: $red;
    }

    &[data-fill="filled"] {
      background: $red;
      border-color: $red;
    }
  }
}
</style>
