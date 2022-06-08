<template>
  <AppSection>
    <AppHero icon="database">
      <template #aTop>{{
        requests ? requests.toLocaleString() : "-"
      }}</template>
      <template #aBottom>requests in last 30 days</template>
      <template #bTop>{{ ips ? ips.toLocaleString() : "-" }}</template>
      <template #bBottom> unique IPs in last 30 days</template>
    </AppHero>
  </AppSection>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import AppHero from "@/components/AppHero.vue";

const store = useStore();

const requests = computed(() => store.state.metadata?.requests);
const ips = computed(() => store.state.metadata?.ips);
</script>
