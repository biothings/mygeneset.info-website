<!--
  font awesome icon wrapper
-->

<template>
  <FontAwesomeIcon :icon="fa" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  findIconDefinition,
  IconPrefix,
  IconName,
} from "@fortawesome/fontawesome-svg-core";
import "@/global/icons";

interface Props {
  // kebab-case name of icon to show. for font awesome, without fas/far/etc
  // prefix. for custom icon, match filename, without extension.
  icon: string;
}

const props = defineProps<Props>();

// find font awesome icon with matching name, if there is one
const fa = computed(() => {
  for (const prefix of ["fas", "far", "fab"]) {
    const match = findIconDefinition({
      prefix: prefix as IconPrefix,
      iconName: props.icon as IconName,
    });
    if (match) return match;
  }
  return "";
});
</script>

<style lang="scss" scoped>
.icon {
  height: 1em;
}
</style>
