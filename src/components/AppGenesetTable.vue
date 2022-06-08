<!--
  higher-order component for showing table of genesets
-->

<template>
  <AppTable :rows="genesets" :cols="cols">
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
    <template #name="{ row }">
      <AppLink :to="`/geneset/${row.id}`">{{
        row.name || row.id?.split("_")?.join(" ") || "..."
      }}</AppLink>
    </template>

    <!-- author/source -->
    <template #author="{ row }">
      <template v-if="row.author">{{ row.author }}</template>
      <AppLink
        v-else-if="row.source"
        :to="$store.state.metadata?.curatedMeta[row.source].url"
      >
        {{ row.source }}
      </AppLink>
    </template>

    <!-- number of genes col -->
    <template #count="{ cell }">
      {{ cell.length.toLocaleString() }}
    </template>

    <!-- gene list col -->
    <template #genes="{ cell }">
      <div class="truncate-3">
        {{ cell.map((gene: Gene) => gene.name).join(", ") }}
      </div>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import { Geneset } from "@/api/genesets";
import { Gene } from "@/api/genes";
import AppTable, { Col } from "./AppTable.vue";

interface Props {
  // list of genesets to display as rows
  genesets: Array<Geneset>;
}

defineProps<Props>();

// columns to show
const cols: Array<Col> = [
  {
    id: "icons",
    heading: "",
    width: "20px",
  },
  {
    id: "name",
    heading: "Name / ID",
    width: "200px",
  },
  {
    id: "author",
    heading: "Author / Source",
    width: "80px",
    align: "center",
  },
  {
    id: "count",
    key: "genes",
    heading: "# of Genes",
    width: "50px",
    align: "center",
  },
  {
    id: "genes",
    key: "genes",
    heading: "Genes",
    width: "500px",
  },
];
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
