<template>
  <AppSection>
    <AppHeading level="2">Recent Genesets</AppHeading>

    <AppGenesetTable
      v-model:start="start"
      :genesets="recentGenesets"
      :per-page="perPage"
      :total="total"
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
  const response = await searchGenesets(
    undefined,
    undefined,
    "updated",
    start.value,
    perPage.value
  );

  recentGenesets.value = response.genesets;
  total.value = response.total;
};

// run search on pagination change
watch([start, perPage], search);

// run search on load
onMounted(search);
</script>
