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
      name="Public"
      v-model="geneset.is_public"
      type="checkbox"
      :disabled="!editable"
    />
  </Section>

  <!-- selected genes section -->
  <Section v-if="!loading && !error">
    <h2>
      <i class="fas fa-check"></i>
      <span>Selected Genes</span>
    </h2>
    <Table :cols="selectedCols" :rows="geneset.genes" />
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
    <Table :cols="addCols" :rows="results">
      <i class="fas fa-briefcase"></i>
      <span>Top {{ top }} of {{ total }} total results</span>
    </Table>
  </Section>

  <!-- finish section -->
  <Section v-if="!loading && !error">
    <Center v-if="editable" :vertical="true" width="200px">
      <Clickable
        v-if="!fresh"
        text="Duplicate"
        icon="fas fa-copy"
        design="big"
        v-tooltip="'Start new geneset from this one'"
      />
      <Clickable
        v-if="fresh"
        text="Publish"
        icon="fas fa-upload"
        design="big"
      />
      <Clickable v-else text="Save Changes" icon="fas fa-upload" design="big" />
      <div class="diff">
        <div v-if="edited" class="edited">
          <span>Edited </span><span>{{ edited }}</span>
        </div>
        <div v-if="added" class="added">
          <span>Added </span><span>{{ added }}</span>
        </div>
        <div v-if="removed" class="removed">
          <span>Removed </span><span>{{ added }}</span>
        </div>
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
import TextBox from "@/components/TextBox.vue";
import SpeciesSelect from "@/components/SpeciesSelect.vue";
import { lookup } from "@/api/genesets";
import { search } from "@/api/genes";
import { Geneset } from "@/api/types";
import { toHumanCase } from "@/util/string";

const blank: Geneset = {
  _id: "",
  creator: "Casey S. Greene",
  date: new Date().toLocaleString(),
  description: "",
  // eslint-disable-next-line
  is_public: true,
  genes: []
};

// columns in gene tables
const cols = [
  { key: "name", name: "Name" },
  { key: "taxid", name: "TaxId" },
  { key: "entrezgene", name: "Entrez" }
];

// columns in selected genes table
const selectedCols = [
  {
    key: "delete",
    name: "",
    align: "center",
    action: "Remove gene from set",
    icon: "fas fa-times"
  },
  ...cols
];

// columns in add genes table
const addCols = [
  {
    key: "add",
    name: "",
    align: "center",
    action: "Add gene to set",
    icon: "fas fa-plus"
  },
  ...cols
];

export default defineComponent({
  components: {
    Section,
    Field,
    Table,
    Center,
    Clickable,
    TextBox,
    SpeciesSelect
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
      // geneset state
      geneset: blank,
      // original unmodified genset
      original: { ...blank },
      // format options expanded state
      expanded: false,
      // search keywords
      keywords: "",
      // selected species
      species: [],
      // add genes table columns
      addCols,
      // add genes table row data
      results: [],
      // "edited" fields diff
      edited: "",
      // added genes diff
      added: "",
      // removed genes diff
      removed: ""
    };
  },
  methods: {
    // load geneset from route id
    async load(id: string) {
      this.loading = true;
      try {
        this.geneset = await lookup(id);
        this.original = { ...this.geneset };
        console.log(this.geneset, this.original);
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
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
    // columns in selected genes table
    selectedCols() {
      // if not editable, remove first col w/ delete button
      if (this.$props.editable) return selectedCols;
      else return selectedCols.slice(1);
    },
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
    geneset: {
      handler() {
        // find changed fields
        const edited = [];
        const fields = ["_id", "creator", "date", "description", "is_public"];
        for (const field of fields) {
          const key = field as keyof Geneset;
          if (this.geneset[key] !== this.original[key])
            edited.push(toHumanCase(key));
        }
        this.edited = edited.join(", ");

        // find removed genes
      },
      deep: true
    },
    // update search when selected species change
    species() {
      this.search();
    }
  },
  async mounted() {
    // load geneset from route it
    if (!this.fresh && this.$route.params.id)
      this.load(this.$route.params.id as string);
    // update search on load
    this.search();
  }
});
</script>

<style scope lang="scss">
.diff {
  .edited > span:first-child {
    color: $blue;
  }
  .added > span:first-child {
    color: $green;
  }
  .removed > span:first-child {
    color: $red;
  }
  & > div > span:last-child {
    color: $dark-gray;
  }
}
</style>
