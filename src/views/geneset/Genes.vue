<template>
  <Section>
    <h2>
      <i class="fas fa-dna"></i>
      <span>Genes</span>
    </h2>
    <Table :cols="_cols" :rows="geneset?.genes || []" @remove="remove" />
  </Section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Section from "@/components/Section.vue";
import Table from "@/components/Table.vue";
import { Geneset } from "@/api/types";

// table columns
const format = (cell: []) => cell?.join(", ") || "";
const cols = [
  {
    key: "remove",
    name: "",
    align: "center",
    button: {
      action: () => "remove",
      icon: () => "fas fa-trash",
      tooltip: () => "Remove gene from set"
    },
    sortable: false
  },
  { key: "name", name: "Name" },
  { key: "alias", name: "Aliases", format },
  { key: "symbol", name: "Symbol", format },
  { key: "ncbigene", name: "Entrez" },
  { key: "ensemblgene", name: "Ensembl", format },
  { key: "uniprot", name: "Uniprot", format }
];

export default defineComponent({
  components: {
    Section,
    Table
  },
  props: {
    // current geneset
    geneset: Object as PropType<Geneset>,
    // is this geneset editable
    editable: Boolean,
    // remove gene from set
    remove: Function
  },
  computed: {
    // table columns
    _cols() {
      // if not editable, remove first col w/ delete button
      if (this.$props.editable) return cols;
      else return cols.slice(1);
    }
  }
});
</script>
