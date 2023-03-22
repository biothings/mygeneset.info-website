<!--
  higher-order component for showing table of genesets
-->

<template>
  <AppTable :rows="genesets" :cols="cols">
    <slot />

    <!-- icons col -->
    <template #icons="{ row }">
      <div class="icons">
        <AppIcon
          v-if="row.isPublic"
          v-tippy="'This is a public geneset'"
          icon="globe"
          class="icon"
        />
        <AppIcon
          v-else
          v-tippy="'This is a private geneset'"
          icon="key"
          class="icon"
        />
        <AppIcon
          v-if="row.source"
          v-tippy="'This is a curated geneset'"
          icon="box"
          class="icon"
        />
        <AppIcon
          v-else-if="row.author"
          v-tippy="'This is a user geneset'"
          icon="user"
          class="icon"
        />
        <AppIcon
          v-else
          v-tippy="'This is an anonymous geneset'"
          icon="user-secret"
          class="icon"
        />
      </div>
    </template>

    <!-- name col -->
    <template #name="{ cell, row }">
      <AppLink :to="`/geneset/${row.id}`">{{ cell || "-" }}</AppLink>
    </template>

    <!-- author -->
    <template #author="{ cell }">
      {{ cell || "-" }}
    </template>

    <!-- source -->
    <template #source="{ cell }">
      <AppLink :to="$store.state.metadata?.curatedMeta[cell]?.url">
        {{ cell || "-" }}
      </AppLink>
    </template>

    <!-- number of genes col -->
    <template #count="{ cell }">
      {{ cell?.toLocaleString() || "-" }}
    </template>

    <!-- gene list col -->
    <template #genes="{ cell }: { cell: Geneset['genes'] }">
      <AppFlex h-align="left" gap="tiny">
        <AppPill
          v-for="(gene, index) in cell.slice(0, top)"
          :key="index"
          v-tippy="getGeneTooltip(gene)"
          >{{ getGeneLabel(gene) }}</AppPill
        >
        <span v-if="cell.length > top"
          >and {{ cell.length - top }} more...</span
        >
      </AppFlex>
    </template>

    <!-- species col -->
    <template #species="{ cell }">
      <AppFlex h-align="left" gap="small">
        <template v-for="(id, index) in uniq(map(cell, 'taxid'))" :key="index">
          <AppPill
            v-if="species[id]"
            v-tippy="getSpeciesTooltip(species[id])"
            :icon="species[id].icon"
          >
            {{ getSpeciesLabel(species[id]) }}</AppPill
          ></template
        >
      </AppFlex>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Gene, getGeneLabel, getGeneTooltip } from "@/api/genes";
import { Geneset } from "@/api/genesets";
import AppTable, { Col } from "./AppTable.vue";
import AppPill from "./AppPill.vue";
import { computed } from "vue";
import {
  getSpeciesLabel,
  getSpeciesTooltip,
  searchSpecies,
  Species,
} from "@/api/species";
import { flatten, keyBy, map, uniq } from "lodash";

interface Props {
  // list of genesets to display as rows
  genesets: Array<Geneset>;
  // whether sortable
  sortable?: boolean;
}

const props = withDefaults(defineProps<Props>(), { sortable: true });

// unique species in displayed genes
const species = ref<Record<Gene["taxid"], Species>>({});

// show this many genes before cutting of
const top = 10;

// columns to show
const cols = computed<Array<Col>>(() => [
  {
    id: "icons",
    heading: "",
    width: "20px",
  },
  {
    id: "name",
    key: "name",
    heading: "Name",
    width: "180px",
  },
  {
    id: "author",
    key: "author",
    heading: "Author",
    width: "100px",
    align: "center",
    sortable: !!props.sortable,
  },
  {
    id: "source",
    key: "source",
    heading: "Source",
    width: "100px",
    align: "center",
    sortable: !!props.sortable,
  },
  {
    id: "category",
    key: "category",
    heading: "Type",
    width: "100px",
  },
  {
    id: "count",
    key: "count",
    heading: "#",
    width: "60px",
    align: "center",
    sortable: !!props.sortable,
  },
  {
    id: "genes",
    key: "genes",
    heading: "Genes",
    width: "380px",
  },
  {
    id: "species",
    key: "genes",
    heading: "Species",
    width: "150px",
  },
]);

// when genesets change
watch(
  () => props.genesets,
  async () => {
    try {
      const ids = uniq(map(flatten(map(props.genesets, "genes")), "taxid"));
      species.value = keyBy((await searchSpecies(ids)).species, "id");
    } catch (error) {
      console.error(error);
    }
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="scss">
.icons {
  display: flex;
  justify-content: flex-end;
}

.icon {
  margin-right: 0.5em;
  color: $gray;
  font-size: 0.9rem;
}
</style>
