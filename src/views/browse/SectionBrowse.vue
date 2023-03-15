<template>
  <AppSection>
    <AppHeading level="2" icon="search">Browse</AppHeading>

    <!-- search -->
    <AppFlex direction="col">
      <!-- boxes -->
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

      <!-- filters -->
      <AppFlex h-align="left" gap="small">
        <AppSelect
          v-model="type"
          text="Search by type"
          :options="typeOptions"
        />
        <AppNumber v-model="countMin" text="Min genes" />
        <AppNumber v-model="countMax" text="Max genes" />
      </AppFlex>
      <AppFlex v-if="type === 'curated'" h-align="left" gap="small">
        Source:
        <AppChecklist
          v-model="sources"
          name="curated-sources"
          @change="search"
        />
      </AppFlex>
    </AppFlex>

    <!-- results -->
    <AppGenesetTable
      v-model:start="start"
      v-model:sort="sort"
      :genesets="genesetResults"
      :per-page="perPage"
      :total="total"
    >
      <AppStatus v-if="loading" status="loading">Loading genesets</AppStatus>
      <AppStatus v-else-if="!genesetResults.length" status="warning"
        >No genesets</AppStatus
      >
    </AppGenesetTable>
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppSpeciesSelect from "@/components/AppSpeciesSelect.vue";
import AppGenesetTable from "@/components/AppGenesetTable.vue";
import AppSelect, {
  Options as SelectOptions,
} from "@/components/AppSelect.vue";
import AppChecklist, {
  Options as ChecklistOptions,
} from "@/components/AppChecklist.vue";
import AppNumber from "@/components/AppNumber.vue";
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
const typeOptions: SelectOptions = [
  { key: "all", text: "All" },
  { key: "user", text: "User" },
  { key: "curated", text: "Curated" },
  { key: "anonymous", text: "Anonymous" },
];

// selected type of geneset
const type = ref(typeOptions[0].key);

// number of genes
const countMin = ref(0);
const countMax = ref(999999);

// selected sources of curated genesets
const sources = ref<ChecklistOptions>([]);

// set source options when loaded in metadata
watch(
  () => store.state.metadata,
  () => {
    if (store.state.metadata)
      sources.value = store.state.metadata.curatedSources.map((source) => ({
        key: source,
        text: source.toUpperCase(),
        checked: true,
      }));
  },
  { immediate: true }
);

// pagination state
const start = ref(0);
const perPage = ref(10);
const total = ref(0);

// sort state
const sort = ref<Sort>();

// loading state
const loading = ref(false);

// geneset results
const genesetResults = ref<Array<Geneset>>([]);

// run request
const search = async () => {
  // reset response
  genesetResults.value = [];

  // status
  loading.value = true;

  // extra part to add to query string to filter by fields
  let fields = "";
  if (type.value === "user") fields = "_exists_:author AND NOT _exists_:source";
  if (type.value === "curated") {
    const allSelected = sources.value.every((source) => source.checked);
    if (allSelected) fields = "NOT _exists_:author AND _exists_:source";
    else
      fields = sources.value
        .filter((source) => source.checked)
        .map((source) => "source:" + source.key)
        .join(" OR ");
  }
  if (type.value === "anonymous")
    fields = "NOT _exists_:author AND NOT _exists_:source";
  fields += ` count:[${countMin.value} TO ${countMax.value}]`;

  // assembled query string
  const query = [keywords.value, fields].filter((part) => part).join(" AND ");

  try {
    const response = await searchGenesets(
      "browseGenesets",
      query,
      species.value,
      sort.value,
      start.value,
      perPage.value
    );

    genesetResults.value = response.genesets;
    total.value = response.total;
  } catch (error) {
    console.error(error);

    if (isStale(error)) return;

    genesetResults.value = [];
    total.value = 0;
  }

  // status
  loading.value = false;
};

// run search on load
onMounted(search);

// when any search params change, re-run search
watch(
  [keywords, species, type, sources, countMin, countMax, sort, start, perPage],
  search
);

// reset page to 0 when search params (except start) change
watch(
  [keywords, species, type, sources, countMin, countMax, sort, perPage],
  () => (start.value = 0)
);
</script>
