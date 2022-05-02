<template>
  <!-- basic details section -->
  <Section>
    <h2>
      <i class="fas fa-feather-alt"></i>
      <span>Details</span>
    </h2>
    <Field
      name="Title"
      v-model="_geneset.name"
      placeholder="Descriptive title of the geneset"
      :disabled="!editable"
    />
    <Field name="Creator" v-model="_geneset.creator" :disabled="true" />
    <Field name="Date" v-model="_geneset.date" :disabled="true" />
    <Field
      name="Description"
      v-model="_geneset.description"
      placeholder="Detailed description of the geneset"
      :disabled="!editable"
    />
    <Field
      name="Public"
      v-model="_geneset.is_public"
      type="checkbox"
      :disabled="!editable"
    />
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Field from "@/components/Field.vue";
import { Geneset } from "@/api/types";

export default defineComponent({
  components: {
    Section,
    Field
  },
  props: {
    // current geneset
    geneset: Object,
    // is this geneset editable
    editable: Boolean
  },
  computed: {
    _geneset: {
      get(): Geneset {
        return this.geneset as Geneset;
      },
      set(value: Geneset) {
        return this.$emit("update:modelValue", value);
      }
    }
  }
});
</script>
