<template>
  <!-- add genes section -->
  <Section>
    <h2>
      <i class="fas fa-plus"></i>
      <span>Add Genes</span>
    </h2>
    <Center :vertical="true" width="100%">
      <TextBox
        :multi="true"
        v-model="keywords"
        v-debounce="search"
        :placeholder="`Search genes by keyword`"
        @expand="expand"
      />
      <SpeciesSelect
        v-model="species"
        :placeholder="`Search genes by species`"
      />
    </Center>
    <Table :cols="cols" :rows="_results" @add="add" @remove="remove">
      <i class="fas fa-dna"></i>
      <span>Top {{ top }} of {{ total }} total results</span>
    </Table>
  </Section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Section from "@/components/Section.vue";
import Table from "@/components/Table.vue";
import Center from "@/components/Center.vue";
import TextBox from "@/components/TextBox.vue";
import SpeciesSelect from "@/components/SpeciesSelect.vue";
import { search } from "@/api/genes";
import { batchSearch } from "@/api/genes";
import { Geneset } from "@/api/types";
import { Gene } from "@/api/types";

// table columns
const format = (cell: []) => cell?.join(", ") || "";
const cols = [
  {
    key: "add",
    name: "",
    align: "center",
    button: {
      action: (cell: undefined, row: Gene) =>
        row?.selected ? "remove" : "add",
      icon: (cell: undefined, row: Gene) =>
        row?.selected ? "fas fa-check" : "fas fa-plus",
      tooltip: (cell: undefined, row: Gene) =>
        row?.selected ? "Remove gene from set" : "Add gene to set"
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
    Table,
    Center,
    TextBox,
    SpeciesSelect
  },
  props: {
    // current geneset
    geneset: Object as PropType<Geneset>,
    // add gene to set
    add: Function,
    // remove gene from set
    remove: Function
  },
  data() {
    return {
      // search keywords
      keywords: "",
      // selected species
      species: [] as string[],
      // table columns
      cols,
      // search results
      results: [] as Gene[],
      // is multi-line search expanded
      expanded: false
    };
  },
  methods: {
    // search genes
    async search() {
      try {
        if (this.expanded)
          this.results = await batchSearch(
            this.keywords.split("\n"),
            this.species
          );
        else this.results = await search(this.keywords, this.species);
      } catch (error) {
        console.error(error);
      }
    },
    // update local expanded state
    expand(newExpanded: boolean) {
      this.expanded = newExpanded;
    }
  },
  computed: {
    // top X of...
    top(): string {
      return Math.min(100, this.results.length || 0).toLocaleString();
    },
    // ...N total reults
    total(): string {
      return ((this.results[0] as Gene)?.total || 0).toLocaleString();
    },
    // copy of results with added properties
    _results(): Gene[] {
      const selected = (this.geneset as Geneset).genes || [];
      return (this.results || []).map((result: Gene) => ({
        ...result,
        selected: selected.find(
          (gene: Gene) => result.mygene_id === gene.mygene_id
        )
          ? true
          : false
      }));
    }
  },
  watch: {
    // update search when selected species change
    species() {
      this.search();
    },
    // update search when expanded changes
    expanded() {
      this.search();
    }
  },
  mounted() {
    // update search on load
    this.search();
  }
});
</script>
