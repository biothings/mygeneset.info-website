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

    <AppGenesetTable v-if="genesets.length" :genesets="genesets" />
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppSpeciesSelect from "@/components/AppSpeciesSelect.vue";
import AppGenesetTable from "@/components/AppGenesetTable.vue";
import AppStatus from "@/components/AppStatus.vue";
import { Geneset, searchGenesets } from "@/api/genesets";

// searched keywords
const keywords = ref("");

// selected species
const species = ref<Array<string>>([]);

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
    genesets.value = (
      await searchGenesets(keywords.value, species.value)
    ).genesets;
  } catch (error) {
    console.error(error);
    genesets.value = [];
  }

  // status
  loading.value = false;
};

onMounted(search);
</script>
