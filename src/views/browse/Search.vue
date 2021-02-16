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
    <Table :cols="cols" :rows="results" />
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Table from "@/components/Table.vue";
import TextBox from "@/components/TextBox.vue";
import SpeciesSelect from "@/components/SpeciesSelect.vue";
import { search } from "@/api/mygenset";
import { Json } from "@/api/index";

const cols = [
  {
    key: "_id",
    name: "Name",
    align: "left",
    format: (cell: Json) => cell.replace(/_/g, " ")
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
    format: (cell: Json) => {
      let list = cell.map((gene: Json) => gene.name).join(", ");
      if (list.length > 100) list = list.slice(0, 100) + "...";
      return list;
    }
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
  methods: {
    async search() {
      this.results = (await search(this.keywords, this.species)) as [];
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
