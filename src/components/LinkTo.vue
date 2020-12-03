<template>
  <a v-if="isExternalLink(to)" v-bind:href="to || ''">
    <slot></slot>
  </a>
  <router-link v-else v-bind:to="to || ''">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isExternalLink } from "@/util/url";

export default defineComponent({
  props: {
    to: String
  },
  methods: {
    isExternalLink
  }
});
</script>
