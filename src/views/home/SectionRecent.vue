<template>
  <AppSection>
    <AppHeading level="2">Recent Genesets</AppHeading>

    <AppGenesetTable :genesets="recentGenesets" />
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getRecentGenesets, Geneset } from "@/api/genesets";
import AppGenesetTable from "@/components/AppGenesetTable.vue";

const recentGenesets = ref<Array<Geneset>>([]);

onMounted(async () => (recentGenesets.value = await getRecentGenesets()));
</script>
