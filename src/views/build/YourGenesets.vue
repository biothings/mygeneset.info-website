<template>
  <Section>
    <h2>Your Genesets</h2>
    <GenesetSearch subject="your genesets" />
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
  { key: "string", name: "String", align: "left" },
  { key: "number", name: "Number", align: "center" },
  {
    key: "long_string",
    name: "Long String Description",
    align: "left"
  }
];
const rows = dummyTable(cols, 8);

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
