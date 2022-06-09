<template>
  <AppSection>
    <AppHeading level="3" icon="plus" link="add">Add Genes</AppHeading>

    <i
      >Switch to multi-line mode to paste comma/tab/newline-separated
      keywords</i
    >

    <AppInput
      v-model="keywords"
      placeholder="Search genes by keyword"
      icon="search"
      mode="switchable"
      @change="search"
    />

    <AppSpeciesSelect
      v-model="species"
      placeholder="Search genes by species"
      @deselect="search"
      @select="search"
    />

    <AppStatus v-if="loading" status="loading">Loading genes</AppStatus>

    <AppTable
      v-else-if="results.length"
      v-model:start="start"
      :rows="results"
      :cols="cols"
      :per-page="perPage"
      :total="total"
    >
      <template #action="{ row }">
        <AppButton
          v-tippy="
            geneInSet(row)
              ? 'Remove this gene from geneset'
              : 'Add this gene to geneset'
          "
          :color="geneInSet(row) ? 'important' : 'normal'"
          :icon="geneInSet(row) ? 'trash-can' : 'plus'"
          @click="geneInSet(row) ? removeGene(row) : addGene(row)"
        />
      </template>
    </AppTable>
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppSpeciesSelect from "@/components/AppSpeciesSelect.vue";
import AppTable, { Col } from "@/components/AppTable.vue";
import AppStatus from "@/components/AppStatus.vue";
import { Gene, searchGenes } from "@/api/genes";
import { Geneset } from "@/api/genesets";
import { isStale } from "@/api";

interface Props {
  // selected genes (current geneset genes)
  genes: Geneset["genes"];
  // gene manipulation functions from parent
  geneInSet: (gene: Gene) => boolean;
  addGene: (gene: Gene) => void;
  removeGene: (gene: Gene) => void;
}

defineProps<Props>();

// searched keywords
const keywords = ref<string | Array<string>>("");

// selected species
const species = ref<Array<string>>([]);

// pagination state
const start = ref(0);
const perPage = ref(10);
const total = ref(0);

// loading state
const loading = ref(false);

// gene results
const results = ref<Array<Gene>>([]);

// results table columns to show
const cols: Array<Col> = [
  {
    id: "action",
    width: "20px",
  },
  {
    id: "name",
    key: "name",
    heading: "Name",
    width: "200px",
  },
  {
    id: "id",
    key: "id",
    heading: "Id",
    width: "80px",
  },
  {
    id: "alias",
    key: "alias",
    heading: "Alias",
    width: "80px",
  },
  {
    id: "symbol",
    key: "symbol",
    heading: "Symbol",
    width: "80px",
  },
  {
    id: "entrez",
    key: "entrez",
    heading: "Entrez",
    width: "80px",
  },
  {
    id: "ensembl",
    key: "ensembl",
    heading: "Ensembl",
    width: "80px",
  },
  {
    id: "uniprot",
    key: "uniprot",
    heading: "Uniprot",
    width: "80px",
  },
];

// run request
const search = async () => {
  // don't run search if nothing searched
  if (!species.value.length && !keywords.value.length) return;

  // reset response
  results.value = [];

  // status
  loading.value = true;

  try {
    const response = await searchGenes(
      keywords.value,
      species.value,
      undefined,
      start.value,
      perPage.value
    );

    results.value = response.genes;
    total.value = response.total;
  } catch (error) {
    console.error(error);

    if (isStale(error)) return;

    results.value = [];
    total.value = 0;
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