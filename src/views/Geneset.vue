<template>
  <!-- /new or /geneset/[ID] page -->
  <Header />
  <Main title="Geneset" icon="fas fa-briefcase">
    <Loading v-if="loading" />
    <Error v-if="error" />
    <template v-if="!loading && !error">
      <Details :geneset="geneset" :editable="editable" />
      <Genes :geneset="geneset" :editable="editable" :remove="remove" />
      <Add v-if="editable" :geneset="geneset" :add="add" :remove="remove" />
      <Finish v-if="editable" :geneset="geneset" :original="original" />
    </template>
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/views/geneset/Loading.vue";
import Error from "@/views/geneset/Error.vue";
import Details from "@/views/geneset/Details.vue";
import Genes from "@/views/geneset/Genes.vue";
import Add from "@/views/geneset/Add.vue";
import Finish from "@/views/geneset/Finish.vue";
import { lookup } from "@/api/genesets";
import { Geneset } from "@/api/types";
import { Gene } from "@/api/types";
import { cloneDeep } from "lodash";

const blank: Geneset = {
  _id: "",
  creator: "Casey S. Greene",
  date: new Date().toLocaleString(),
  description: "",
  // eslint-disable-next-line
  is_public: true,
  genes: []
};

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Loading,
    Error,
    Details,
    Genes,
    Add,
    Finish
  },
  data() {
    return {
      // loading state
      loading: false,
      // error state
      error: false,
      // geneset state
      geneset: Object as Geneset,
      // original unmodified geneset
      original: Object as Geneset
    };
  },
  methods: {
    // load geneset from route id
    async load(id: string) {
      this.loading = true;
      try {
        this.geneset = await lookup(id);
        this.original = cloneDeep(this.geneset);
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    // add gene to set
    add(cell: undefined, row: Gene) {
      (this.geneset as Geneset)?.genes?.push(row);
    },
    // remove gene from set
    remove(cell: undefined, row: Gene) {
      const match = (gene: Gene) => gene.mygene_id || row.mygene_id;
      const index =
        ((this.geneset as Geneset)?.genes || []).findIndex(match) || -1;
      (this.geneset as Geneset)?.genes?.splice(index, 1);
    }
  },
  computed: {
    // dummy is editable property
    editable() {
      console.log(this.original);
      return this.$route.params.id ? false : true;
    }
  },
  mounted() {
    // load geneset from id in url, or blank if on /new
    if (this.$route.params.id) this.load(this.$route.params.id as string);
    else {
      this.geneset = cloneDeep(blank);
      this.original = cloneDeep(blank);
    }
  }
});
</script>
