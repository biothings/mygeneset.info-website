<template>
  <Section v-if="loading">
    <Center>
      <span class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <span>Loading geneset details</span>
      </span>
    </Center>
  </Section>
  <Section v-if="error">
    <Center>
      <span class="error">
        <i class="fas fa-exclamation-circle"></i>
        <span>Couldn't find geneset</span>
      </span>
    </Center>
  </Section>
  <Section v-if="!loading && !error">
    <h2>
      <i class="fas fa-feather-alt"></i>
      <span>Details</span>
    </h2>
    <Field
      name="Title"
      v-model="geneset.title"
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
      v-model="geneset.visibility"
      :options="['Public', 'Private']"
      :disabled="!editable"
    />
  </Section>
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
        @click="formatExpanded = !formatExpanded"
      />
      <select v-if="formatExpanded">
        <option>Tab-separated (.tsv)</option>
        <option>Comma-separated (.csv)</option>
        <option>Plain text (.txt)</option>
      </select>
    </Center>
  </Section>
  <Section v-if="editable && !loading && !error">
    <h2>
      <i class="fas fa-plus"></i>
      <span>Add Genes</span>
    </h2>
    <Placeholder>
      Gene search and add
    </Placeholder>
  </Section>
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
import { lookup } from "@/api/mygenset";

interface Gene {
  mygene_id: string;
  name: string;
  ensemblgene: string;
  ncbigene: string;
  uniprot: string;
}

interface Geneset {
  title: string;
  creator: string;
  date: string;
  description: string;
  visibility: "Public" | "Private";
  genes: Gene[];
}

const blankGeneset: Geneset = {
  title: "",
  creator: "Casey S. Greene",
  date: new Date().toLocaleString(),
  description: "",
  visibility: "Public",
  genes: []
};

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
    editable: Boolean,
    fresh: Boolean
  },
  data() {
    return {
      loading: false,
      error: false,
      geneset: blankGeneset,
      formatExpanded: false
    };
  },
  methods: {
    removeRow({ originalIndex }: { originalIndex: number }) {
      console.log(originalIndex);
    },
    async loadGeneset(id: string) {
      this.loading = true;
      try {
        const geneset = await lookup(id);
        this.geneset.title = geneset._id;
        // this.geneset.creator = geneset.author;
        // this.geneset.date = geneset.date;
        // this.geneset.description = geneset.description;
        this.geneset.visibility = geneset.is_public ? "Public" : "Private";
        this.geneset.genes = geneset.genes;
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    _genesCols() {
      if (this.$props.editable) return genesCols;
      else return genesCols.slice(0, -1);
    }
  },
  async mounted() {
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
