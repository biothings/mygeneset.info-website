<template>
  <Section
    ><h2>
      <i class="fas fa-dna"></i>
      <span>Genes</span>
    </h2>
    <Table :cols="_cols" :rows="geneset?.genes || []" />
    <Center :vertical="true" width="200px">
      <Clickable text="Download" icon="fas fa-download" design="big" />
      <Clickable
        text="Format Options"
        icon="fas fa-cog"
        design="plain"
        @click="expanded = !expanded"
      />
      <select v-if="expanded">
        <option>Tab-separated (.tsv)</option>
        <option>Comma-separated (.csv)</option>
        <option>Plain text (.txt)</option>
      </select>
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Table from "@/components/Table.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";

// table columns
const cols = [
  {
    key: "remove",
    name: "",
    align: "center",
    action: "Remove gene from set",
    icon: "fas fa-times"
  },
  { key: "name", name: "Name" },
  { key: "taxid", name: "Tax Id" },
  { key: "entrezgene", name: "Entrez" }
];

export default defineComponent({
  components: {
    Section,
    Table,
    Center,
    Clickable
  },
  props: {
    // current geneset
    geneset: {},
    // is this geneset editable
    editable: Boolean
  },
  data() {
    return {
      // format options expanded state
      expanded: false
    };
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
