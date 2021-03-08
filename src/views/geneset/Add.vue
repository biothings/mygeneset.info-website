<template>
  <!-- add genes section -->
  <Section>
    <h2>
      <i class="fas fa-plus"></i>
      <span>Add Genes</span>
    </h2>
    <Center :vertical="true" width="100%">
      <TextBox
        :placeholder="`Search genes by keyword`"
        v-model="keywords"
        v-debounce="search"
      />
      <SpeciesSelect
        :placeholder="`Search genes by species`"
        v-model="species"
      />
    </Center>
    <Table :cols="cols" :rows="results">
      <i class="fas fa-dna"></i>
      <span>Top {{ top }} of {{ total }} total results</span>
    </Table>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Table from "@/components/Table.vue";
import Center from "@/components/Center.vue";
import TextBox from "@/components/TextBox.vue";
import SpeciesSelect from "@/components/SpeciesSelect.vue";
import { search } from "@/api/genes";
import { Geneset } from "@/api/types";

// table columns
const cols = [
  {
    key: "add",
    name: "",
    align: "center",
    action: "Add gene to set",
    icon: "fas fa-plus"
  },
  { key: "name", name: "Name" },
  { key: "taxid", name: "TaxId" },
  { key: "entrezgene", name: "Entrez" }
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
    geneset: {}
  },
  data() {
    return {
      // search keywords
      keywords: "",
      // selected species
      species: [],
      // table columns
      cols,
      // search results
      results: []
    };
  },
  methods: {
    // search genes
    async search() {
      try {
        this.results = (await search(this.keywords, this.species)) as [];
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    // top X of...
    top(): string {
      return Math.min(100, this.results.length || 0).toLocaleString();
    },
    // ...N total reults
    total(): string {
      return ((this.results[0] as Geneset)?.total || 0).toLocaleString();
    }
  },
  watch: {
    // update search when selected species change
    species() {
      this.search();
    }
  },
  mounted() {
    // update search on load
    this.search();
  }
});
</script>
