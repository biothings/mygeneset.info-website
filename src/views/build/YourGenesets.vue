<template>
  <Section>
    <h2>Your Genesets</h2>
    <Table :cols="cols" :rows="genesets">
      <i class="fas fa-briefcase"></i>
      <span>First {{ top }} of your {{ total }} total genesets</span>
    </Table>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Table from "@/components/Table.vue";
import { Geneset } from "@/api/types";

// table columns
const cols = [
  {
    key: "name",
    name: "Name",
    format: (cell: Geneset["name"], row: Geneset) =>
      `<a href="/geneset/${row._id}">${row.name}</a>`
  },
  {
    key: "genes",
    name: "# of Genes",
    align: "center",
    format: (cell: Geneset["genes"]) => cell?.length || 0
  },
  {
    key: "genes",
    name: "Genes",
    format: (cell: Geneset["genes"]) =>
      (cell || [])
        .map(
          gene =>
            gene?.name ||
            (gene?.symbol || [])[0] ||
            (gene?.ensemblgene || [])[0] ||
            gene?.mygene_id ||
            ""
        )
        .filter(gene => gene)
        .join(", ")
  }
];

export default defineComponent({
  components: {
    Section,
    Table
  },
  data() {
    return {
      // results table columns
      cols
    };
  },
  computed: {
    // user genesets
    genesets(): Geneset[] {
      return this.$store.state.genesets;
    },
    // top X of...
    top(): string {
      return Math.min(100, this.genesets.length || 0).toLocaleString();
    },
    // ...N total reults
    total(): string {
      return ((this.genesets[0] as Geneset)?.total || 0).toLocaleString();
    }
  }
});
</script>

<style scoped lang="scss"></style>
