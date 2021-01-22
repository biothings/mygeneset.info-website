<template>
  <Section>
    <Field
      name="Title"
      v-model="title"
      placeholder="Descriptive title of the geneset"
      :disabled="!editable"
    />
    <Field name="Creator" v-model="creator" :disabled="true" />
    <Field name="Date" v-model="date" :disabled="true" />
    <Field
      name="Description"
      v-model="description"
      placeholder="Detailed description of the geneset"
      :disabled="!editable"
    />
    <Field
      name="Visibility"
      v-model="visibility"
      :options="['Public', 'Private']"
      :disabled="!editable"
    />
    <h2>Selected Genes</h2>
    <Table
      :cols="selectedGenesCols"
      :rows="selectedGenes"
      @action="removeRow"
    />
    <Center :vertical="true" width="250px">
      <Clickable text="Download" icon="fas fa-download" design="big" />
      <Clickable
        text="Format Options"
        icon="fas fa-cog"
        design="plain"
        @click="formatExpanded = !formatExpanded"
      />
      <select v-if="formatExpanded">
        <option>Tab-separated (.tsv)</option>
        <option>Comma-separated (.csv)</option>
        <option>Plain text (.txt)</option>
      </select>
    </Center>
    <comopnent v-if="editable">
      <h2>Add Genes</h2>
      <GenesetSearch placeholder="Search genes by keyword" />
      <Table :cols="addGenesCols" :rows="addGenes" />
    </comopnent>
    <Center width="200px">
      <Clickable text="Publish" icon="fas fa-upload" design="big" />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Field from "@/components/Field.vue";
import Table from "@/components/Table.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import GenesetSearch from "@/components/GenesetSearch.vue";
import { dummyTable } from "@/util/debug";

const selectedGenesCols = [
  { key: "string", name: "String", align: "left" },
  { key: "number", name: "Number", align: "center" },
  { key: "long_string", name: "Long String Description", align: "left" },
  {
    key: "delete",
    name: "",
    align: "center",
    action: "Remove gene from set",
    icon: "fas fa-trash"
  }
];
const selectedGenes = dummyTable(selectedGenesCols, 8);

const addGenesCols = [
  { key: "string", name: "String", align: "left" },
  { key: "number", name: "Number", align: "center" },
  { key: "long_string", name: "Long String Description", align: "left" }
];
const addGenes = dummyTable(selectedGenesCols, 80);

export default defineComponent({
  components: {
    Section,
    Field,
    Table,
    Center,
    Clickable,
    GenesetSearch
  },
  props: {
    editable: Boolean
  },
  data() {
    return {
      title: "",
      creator: "Casey Greene",
      date: new Date().toDateString(),
      description: "",
      visibility: "Public",
      selectedGenesCols,
      selectedGenes,
      formatExpanded: false,
      addGenesCols,
      addGenes
    };
  },
  methods: {
    removeRow: function({ originalIndex }: { originalIndex: number }) {
      this.selectedGenes.splice(originalIndex, 1);
    }
  }
});
</script>
