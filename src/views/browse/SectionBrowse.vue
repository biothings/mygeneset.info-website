<template>
  <AppSection>
    <AppHeading level="2" icon="search">Browse</AppHeading>

    <AppInput
      v-model="keywords"
      placeholder="Search genesets by keyword"
      icon="search"
      @change="search"
    />

    <AppSpeciesSelect
      v-model="species"
      placeholder="Search genesets by species"
      @deselect="search"
      @select="search"
    />

    <AppStatus v-if="loading" status="loading">Loading genesets</AppStatus>

    <AppGenesetTable
      v-if="genesets.length"
      v-model:start="start"
      :genesets="genesets"
      :per-page="perPage"
      :total="total"
    />
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppSpeciesSelect from "@/components/AppSpeciesSelect.vue";
import AppGenesetTable from "@/components/AppGenesetTable.vue";
import AppStatus from "@/components/AppStatus.vue";
import { Geneset, searchGenesets } from "@/api/genesets";

// searched keywords
const keywords = ref("");

// selected species
const species = ref<Array<string>>([]);

// pagination state
const start = ref(0);
const perPage = ref(10);
const total = ref(0);

// loading state
const loading = ref(false);

// geneset results
const genesets = ref<Array<Geneset>>([]);

// run request
const search = async () => {
  // reset response
  genesets.value = [];

  // status
  loading.value = true;

  try {
    const response = await searchGenesets(
      keywords.value,
      species.value,
      undefined,
      start.value,
      perPage.value
    );

    genesets.value = response.genesets;
    total.value = response.total;
  } catch (error) {
    console.error(error);
    genesets.value = [];
  }

  // status
  loading.value = false;
};

// run search on load
onMounted(search);

// run search on pagination change
watch([start, perPage], search);

// reset page to 0 when search changes
watch([keywords, species], () => (start.value = 0));
</script>
