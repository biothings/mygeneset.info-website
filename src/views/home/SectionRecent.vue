<template>
  <AppSection>
    <AppHeading level="2">Recent Genesets</AppHeading>

    <AppGenesetTable
      v-model:start="start"
      :genesets="recentGenesets"
      :per-page="perPage"
      :total="total"
      :sortable="false"
    />
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { searchGenesets, Geneset } from "@/api/genesets";
import AppGenesetTable from "@/components/AppGenesetTable.vue";

// results
const recentGenesets = ref<Array<Geneset>>([]);

// pagination state
const start = ref(0);
const perPage = ref(10);
const total = ref(0);

const search = async () => {
  // get list of genesets in order of date update
  try {
    const response = await searchGenesets(
      "getRecentGenesets",
      undefined,
      undefined,
      { col: "updated", dir: "up" },
      start.value,
      perPage.value
    );

    recentGenesets.value = response.genesets;
    total.value = response.total;
  } catch (error) {
    console.error(error);
  }
};

// run search on pagination change
watch([start, perPage], search);

// run search on load
onMounted(search);
</script>
