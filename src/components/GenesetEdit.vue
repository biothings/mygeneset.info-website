<template>
  <!-- geneset edit higher-order-component -->

  <!--  loading spinner -->
  <Section v-if="loading">
    <Center>
      <span class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <span>Loading geneset details</span>
      </span>
    </Center>
  </Section>

  <!-- error message -->
  <Section v-if="error">
    <Center>
      <span class="error">
        <i class="fas fa-exclamation-circle"></i>
        <span>Couldn't find geneset</span>
      </span>
    </Center>
  </Section>

  <!-- basic details section -->
  <Section v-if="!loading && !error">
    <h2>
      <i class="fas fa-feather-alt"></i>
      <span>Details</span>
    </h2>
    <Field
      name="Title"
      v-model="geneset._id"
      placeholder="Descriptive title of the geneset"
      :disabled="!editable"
    />
    <Field name="Creator" v-model="geneset.creator" :disabled="true" />
    <Field name="Date" v-model="geneset.date" :disabled="true" />
    <Field
      name="Description"
      v-model="geneset.description"
      placeholder="Detailed description of the geneset"
      :disabled="!editable"
    />
    <Field
      name="Visibility"
      v-model="geneset.is_public"
      :options="['Public', 'Private']"
      :disabled="!editable"
    />
  </Section>

  <!-- selected genes section -->
  <Section v-if="!loading && !error">
    <h2>
      <i class="fas fa-check"></i>
      <span>Selected Genes</span>
    </h2>
    <Table :cols="_genesCols" :rows="geneset.genes" @action="removeRow" />
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

  <!-- add genes section -->
  <Section v-if="editable && !loading && !error">
    <h2>
      <i class="fas fa-plus"></i>
      <span>Add Genes</span>
    </h2>
    <Placeholder>
      Gene search and add
    </Placeholder>
  </Section>

  <!-- finish section -->
  <Section v-if="!loading && !error">
    <Center v-if="!fresh" :vertical="true" width="200px">
      <Clickable text="Duplicate" icon="fas fa-copy" design="big" />
      <div>Start new geneset from this one</div>
    </Center>
    <Center v-if="editable" :vertical="true" width="200px">
      <Clickable
        v-if="fresh"
        text="Publish"
        icon="fas fa-upload"
        design="big"
      />
      <Clickable v-else text="Save Changes" icon="fas fa-upload" design="big" />
      <div>
        <span class="edit">Edited</span>{{ " " }}
        <span class="diff">title, description, visibility</span><br />
        <span class="add">Added</span> <span class="diff">X genes</span><br />
        <span class="remove">Removed</span> <span class="diff">X genes</span>
      </div>
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
import Placeholder from "@/components/Placeholder.vue";
import { lookup } from "@/api/genesets";
import { Geneset } from "@/types";

const blank: Geneset = {
  _id: "",
  creator: "Casey S. Greene",
  date: new Date().toLocaleString(),
  description: "",
  // eslint-disable-next-line
  is_public: true,
  genes: []
};

// columns in selected genes table
const genesCols = [
  { key: "name", name: "Name", align: "left" },
  { key: "ensemblgene", name: "Ensembl ID", align: "center" },
  { key: "uniprot", name: "Uniprot ID", align: "center" },
  {
    key: "delete",
    name: "",
    align: "center",
    action: "Remove gene from set",
    icon: "fas fa-trash"
  }
];

export default defineComponent({
  components: {
    Section,
    Field,
    Table,
    Center,
    Clickable,
    Placeholder
  },
  props: {
    // is this geneset editable
    editable: Boolean,
    // is this a new geneset
    fresh: Boolean
  },
  data() {
    return {
      // loading state
      loading: false,
      // error state
      error: false,
      // current geneset
      geneset: blank,
      // format options expanded state
      expanded: false
    };
  },
  methods: {
    // load geneset from route id
    async loadGeneset(id: string) {
      this.loading = true;
      try {
        this.geneset = await lookup(id);
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    // columns in selected genes table
    _genesCols() {
      if (this.$props.editable) return genesCols;
      else return genesCols.slice(0, -1);
    }
  },
  async mounted() {
    // load geneset from route it
    if (!this.fresh && this.$route.params.id)
      this.loadGeneset(this.$route.params.id as string);
  }
});
</script>

<style scope lang="scss">
.edit {
  color: $blue;
}
.add {
  color: $green;
}
.remove {
  color: $red;
}
.diff {
  color: $dark-gray;
}
</style>
