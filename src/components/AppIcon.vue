<!--
  wrapper for font awesome icon or custom icon loaded inline
-->

<template>
  <InlineSvg v-if="custom" :src="custom" class="icon" aria-hidden="true" />
  <FontAwesomeIcon
    v-else-if="fa"
    :icon="fa"
    :data-icon="icon"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  findIconDefinition,
  IconPrefix,
  IconName,
} from "@fortawesome/fontawesome-svg-core";
import InlineSvg from "vue-inline-svg";
import "@/global/icons";

interface Props {
  // name of icon to show
  // for font awesome, do normal class name but without any prefixes
  // for custom icon, match filename without extension
  icon: string;
}

const props = defineProps<Props>();

// find custom icon with matching name, if there is one
const custom = computed((): string => {
  try {
    return require(`@/assets/icons/${props.icon}.svg`);
  } catch (error) {
    return "";
  }
});

// find font awesome icon with matching name, if there is one
const fa = computed(() => {
  for (const prefix of ["fas", "far", "fab"]) {
    const match = findIconDefinition({
      prefix: prefix as IconPrefix,
      iconName: props.icon as IconName,
    });
    if (match) return match;
  }
  return null;
});
</script>

<style scoped lang="scss">
.icon {
  height: 1em;
}
</style>
