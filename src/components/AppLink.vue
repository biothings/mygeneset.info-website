<!--
  router or external link
-->

<template>
  <a v-if="isExternalLink(to)" :href="to || '/'" target="_blank">
    <slot></slot>
  </a>
  <router-link v-else :to="to || '/'">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { isExternalLink } from "@/util/url";

interface Props {
  // where to link to
  to?: string;
}

withDefaults(defineProps<Props>(), { to: "" });
</script>
