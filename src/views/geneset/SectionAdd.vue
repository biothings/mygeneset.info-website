<template>
  <AppSection>
    <AppHeading level="3" icon="plus" link="add">Add Genes</AppHeading>

    <!-- search -->
    <AppFlex direction="col">
      <AppInput
        v-model="keywords"
        v-tippy="'Comma/tab/newline-separate to perform batch searches'"
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
    </AppFlex>

    <!-- gene results -->
    <AppTable
      v-model:start="start"
      :rows="geneResults"
      :cols="cols"
      :per-page="perPage"
      :total="total"
    >
      <!-- status -->
      <AppStatus v-if="loading" status="loading">Loading genes</AppStatus>
      <AppStatus v-else-if="!geneResults.length" status="warning"
        >No genes</AppStatus
      >

      <!-- action col -->
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
const keywords = ref("");

// selected species
const species = ref<Array<string>>([]);

// pagination state
const start = ref(0);
const perPage = ref(10);
const total = ref(0);

// loading state
const loading = ref(false);

// gene results
const geneResults = ref<Array<Gene>>([]);

// gene results table columns to show
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
  geneResults.value = [];

  // status
  loading.value = true;

  // if comma/tab/newline-separated, perform batch search
  let search: Parameters<typeof searchGenes>[0] =
    keywords.value.split(/[,|\t|\n]/);
  if (search.length === 1) search = search[0];

  try {
    const response = await searchGenes(
      search,
      species.value,
      undefined,
      start.value,
      perPage.value
    );

    geneResults.value = response.genes;
    total.value = response.total;
  } catch (error) {
    console.error(error);

    if (isStale(error)) return;

    geneResults.value = [];
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
