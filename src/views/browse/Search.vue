<template>
  <Section>
    <Center :vertical="true" width="100%">
      <TextBox
        :placeholder="`Search genesets by keyword`"
        v-model="keywords"
        v-debounce="search"
      />
      <SpeciesSelect
        :placeholder="`Search genesets by species`"
        v-model="species"
      />
    </Center>
    <Table :cols="cols" :rows="results">
      <i class="fas fa-briefcase"></i>
      <span>Top {{ top }} of {{ total }} total results</span>
    </Table>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Table from "@/components/Table.vue";
import TextBox from "@/components/TextBox.vue";
import SpeciesSelect from "@/components/SpeciesSelect.vue";
import { search } from "@/api/genesets";
import { Json } from "@/api/index";

const cols = [
  {
    key: "_id",
    name: "Name",
    align: "left",
    format: (cell: Json) => `<a href="/geneset/${cell}">${cell}</a>`
  },
  {
    key: "genes",
    name: "# of Genes",
    align: "center",
    format: (cell: Json) => cell?.length
  },
  {
    key: "genes",
    name: "Genes",
    align: "left",
    format: (cell: Json) =>
      [cell]
        .flat()
        .map(
          gene =>
            gene.name ||
            [gene.ensemblgene].flat()[0] ||
            [gene.mygene_id].flat()[0] ||
            ""
        )
        .filter(gene => gene)
        .join(", ")
  }
];

export default defineComponent({
  components: {
    Section,
    Center,
    Table,
    TextBox,
    SpeciesSelect
  },
  props: {
    subject: String
  },
  data() {
    return {
      keywords: "",
      species: [],
      cols,
      results: []
    };
  },
  computed: {
    top(): string {
      return Math.min(
        100,
        (this.results[0] as Json)?.total || 0
      ).toLocaleString();
    },
    total(): string {
      return ((this.results[0] as Json)?.total || 0).toLocaleString();
    }
  },
  methods: {
    async search() {
      try {
        this.results = (await search(this.keywords, this.species)) as [];
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    species() {
      this.search();
    }
  },
  mounted() {
    this.search();
  }
});
</script>

<style scope lang="scss">
td {
  max-width: 1000px;
  @include truncate;
}
</style>
