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

    <AppFlex>
      Search by type:
      <AppSelect v-model="type" :options="typeOptions" />
      <AppSelect
        v-if="type === 'curated'"
        v-model="source"
        :options="sourceOptions"
      />
    </AppFlex>

    <AppStatus v-if="loading" status="loading">Loading genesets</AppStatus>

    <AppGenesetTable
      v-else-if="genesets.length"
      v-model:start="start"
      v-model:sort="sort"
      :genesets="genesets"
      :per-page="perPage"
      :total="total"
    />
  </AppSection>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { startCase } from "lodash";
import AppInput from "@/components/AppInput.vue";
import AppSpeciesSelect from "@/components/AppSpeciesSelect.vue";
import AppGenesetTable from "@/components/AppGenesetTable.vue";
import AppSelect, { Options } from "@/components/AppSelect.vue";
import { Sort } from "@/components/AppTable.vue";
import AppStatus from "@/components/AppStatus.vue";
import { Geneset, searchGenesets } from "@/api/genesets";
import { isStale } from "@/api";
import { useStore } from "@/store";

const store = useStore();

// searched keywords
const keywords = ref("");

// selected species
const species = ref<Array<string>>([]);

// options for type of geneset
const typeOptions: Options = [
  { key: "all", text: "All" },
  { key: "user", text: "User" },
  { key: "curated", text: "Curated" },
  { key: "anonymous", text: "Anonymous" },
];

// selected type of geneset
const type = ref("all");

// options for source of curated genesets
const sourceOptions = computed<Options>(() => [
  { key: "all", text: "All" },
  ...(store.state.metadata?.curatedSources?.map((source) => ({
    key: source,
    text: startCase(source),
  })) || []),
]);

// selected source of curated genesets
const source = ref("all");

// pagination state
const start = ref(0);
const perPage = ref(10);
const total = ref(0);

// sort state
const sort = ref<Sort>();

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

  // query string
  let query = keywords.value;
  if (type.value === "user") {
    query += "_exists_:author";
  }

  try {
    const response = await searchGenesets(
      "browseGenesets",
      query,
      species.value,
      sort.value,
      start.value,
      perPage.value
    );

    genesets.value = response.genesets;
    total.value = response.total;
  } catch (error) {
    console.error(error);

    if (isStale(error)) return;

    genesets.value = [];
    total.value = 0;
  }

  // status
  loading.value = false;
};

// run search on load
onMounted(search);

// run search on state change
watch([start, perPage, sort], search);

// reset page to 0 when search changes
watch([keywords, species], () => (start.value = 0));
</script>
