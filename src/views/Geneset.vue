<template>
  <!-- /new or /geneset/[ID] page -->
  <Header />
  <Main title="Geneset" icon="fas fa-briefcase">
    <Loading v-if="loading" />
    <Error v-if="error" />
    <template v-if="!loading && !error">
      <Details :geneset="geneset" :editable="editable" />
      <Genes :geneset="geneset" :editable="editable" />
      <Add v-if="editable" :geneset="geneset" />
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
  data: function() {
    return {
      // loading state
      loading: false,
      // error state
      error: false,
      // geneset state
      geneset: {},
      // original unmodified geneset
      original: { ...blank }
    };
  },
  methods: {
    // load geneset from route id
    async load(id: string) {
      this.loading = true;
      try {
        this.geneset = await lookup(id);
        this.original = { ...this.geneset };
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    editable() {
      return this.$route.params.id ? false : true;
    }
  },
  mounted() {
    if (this.$route.params.id) this.load(this.$route.params.id as string);
    else this.geneset = blank;
  }
});
</script>
