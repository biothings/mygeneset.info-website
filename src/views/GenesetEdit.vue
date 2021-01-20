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
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Field from "@/components/Field.vue";

export default defineComponent({
  components: {
    Section,
    Field
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
      visibility: "Public"
    };
  }
});
</script>
