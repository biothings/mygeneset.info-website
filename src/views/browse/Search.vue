<template>
  <Section>
    <GenesetSearch />
    <Table :cols="cols" :rows="rows" />
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import GenesetSearch from "@/components/GenesetSearch.vue";
import Table from "@/components/Table.vue";
import { dummyTable } from "@/util/debug";

const cols = [
  { name: "string", align: "left" },
  { name: "number", align: "center" },
  { name: "long string description", align: "left" }
];
const rows = dummyTable(
  cols.map(col => col.name),
  101
);

export default defineComponent({
  components: {
    Section,
    GenesetSearch,
    Table
  },
  data() {
    return {
      cols,
      rows
    };
  }
});
</script>

<style scoped lang="scss"></style>
