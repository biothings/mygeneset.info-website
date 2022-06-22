<!--
  heading to place at top of sections, with anchor link
-->

<template>
  <component :is="'h' + level" :id="link" ref="heading" class="heading">
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
interface Props {
  // level of heading
  level: 1 | 2 | 3 | 4 | "1" | "2" | "3" | "4";
  // link for anchor
  link?: string;
  // icon to show next to text
  icon?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
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
  margin-right: 0.75em;
  color: $gray;
}

.heading:hover .anchor {
  opacity: 1;
}
</style>
