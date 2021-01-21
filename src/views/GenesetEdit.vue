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
    <Table :cols="cols" :rows="rows" @action="removeRow" />
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Field from "@/components/Field.vue";
import Table from "@/components/Table.vue";
import { dummyTable } from "@/util/debug";

const cols = [
  { name: "string", align: "left" },
  { name: "number", align: "center" },
  { name: "long string description", align: "left" },
  {
    name: "",
    align: "center",
    action: "Remove gene from set",
    icon: "fas fa-trash"
  }
];
const rows = dummyTable(
  cols.map(col => col.name),
  10
);

export default defineComponent({
  components: {
    Section,
    Field,
    Table
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
      cols,
      rows
    };
  },
  methods: {
    removeRow: function({ rowIndex }: { rowIndex: number }) {
      this.rows.splice(rowIndex, 1);
    }
  }
});
</script>
