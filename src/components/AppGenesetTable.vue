<!--
  higher-order component for showing table of genesets
-->

<template>
  <AppTable :rows="genesets" :cols="cols">
    <!-- name col -->
    <template #name="{ row }">
      <AppLink :to="`geneset/${row.id}`">{{ row.name || "..." }}</AppLink>
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
import AppTable from "./AppTable.vue";

interface Props {
  // list of genesets to display as rows
  genesets: Array<Geneset>;
}

defineProps<Props>();

// columns to show
const cols = [
  {
    id: "name",
    key: "name",
    heading: "Name",
    width: "200px",
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
