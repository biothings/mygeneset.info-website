<!--
  heading to place at top of sections, with anchor link
-->

<template>
  <component :is="tag || 'div'" :id="link" ref="heading" class="heading">
    <!-- heading icon -->
    <AppIcon v-if="icon" :icon="icon" class="icon" />

    <!-- heading content -->
    <slot />

    <!-- heading anchor -->
    <AppLink
      v-if="link"
      :to="'#' + link"
      class="anchor"
      :aria-label="'Link to this section'"
    >
      <AppIcon icon="link" />
    </AppLink>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { kebabCase } from "lodash";

interface Props {
  // level of heading
  level: 1 | 2 | 3 | 4 | "1" | "2" | "3" | "4";
  // icon to show next to text
  icon?: string;
}

const props = defineProps<Props>();

// heading ref
const heading = ref<HTMLElement>();

// get heading level/tag, i.e. h1, h2, h3, etc
const tag = computed(() => "h" + props.level);
// determine link from text content of heading
const link = computed(() =>
  kebabCase(heading.value?.innerText.toLowerCase() || "")
);
</script>

<style lang="scss" scoped>
.anchor {
  display: inline-block;
  width: 0;
  margin-left: 0.75em;
  opacity: 0;
  text-decoration: none;
  font-size: 0.8em;
  transition: opacity $fast, color $fast;
}

.anchor:focus {
  opacity: 1;
}

.icon {
  position: relative;
  top: -1px;
  margin-right: 0.75em;
  color: $gray;
  vertical-align: middle;
}

.heading:hover .anchor {
  opacity: 1;
}
</style>
