<template>
  <!-- /new or /geneset/[ID] page -->
  <Header />
  <Main title="Geneset" icon="fas fa-briefcase">
    <Loading v-if="loading" />
    <Error v-if="error" />
    <template v-if="!loading && !error">
      <Details :geneset="geneset" :editable="editable" />
      <Genes :geneset="geneset" :editable="editable" :remove="remove" />
      <Download :geneset="geneset" />
      <Add v-if="editable" :geneset="geneset" :add="add" :remove="remove" />
      <Finish
        v-if="editable"
        :geneset="geneset"
        :original="original"
        :fresh="fresh"
        :update="update"
        :destroy="destroy"
      />
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
import Download from "@/views/geneset/Download.vue";
import Add from "@/views/geneset/Add.vue";
import Finish from "@/views/geneset/Finish.vue";
import { lookup, update, destroy } from "@/api/genesets";
import { Geneset } from "@/api/types";
import { Gene } from "@/api/types";
import { cloneDeep } from "lodash";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Loading,
    Error,
    Details,
    Genes,
    Download,
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
      geneset: {} as Geneset,
      // original unmodified geneset
      original: {} as Geneset,
      // whether geneset is editable by logged in user
      editable: false,
      // whether is new geneset (can't use "new" because it's a js keyword)
      fresh: false
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
    },
    // update geneset
    async update() {
      if (!window.confirm("Are you sure you want to update this geneset?"))
        return;

      const {
        _id,
        name = "",
        description = "",
        // eslint-disable-next-line
        is_public = false,
        genes = []
      } = this.geneset;

      if (!name.trim()) {
        window.alert("Please enter a name for this geneset!");
        return;
      }

      const success = await update(
        this.fresh,
        _id || "",
        name,
        description,
        is_public,
        genes?.map(gene => gene.mygene_id || "") || []
      );

      // go back to build page
      if (success) this.$router.push("/build");
    },
    // delete geneset
    async destroy() {
      if (
        !window.confirm(
          "Are you sure you want to delete this geneset? This cannot be undone."
        )
      )
        return;

      const success = await destroy(this.geneset._id || "");

      // go back to build page
      if (success) this.$router.push("/build");
    }
  },
  mounted() {
    // load geneset from id in url, or blank if on /new
    if (this.$route.params.id) {
      this.load(this.$route.params.id as string);
      this.fresh = false;
      this.editable = this.geneset.creator === this.$store.state.username;
    } else {
      const blank: Geneset = {
        _id: "",
        name: "",
        creator: this.$store.state.username,
        date: new Date().toLocaleString(),
        description: "",
        // eslint-disable-next-line
        is_public: true,
        genes: []
      };

      this.geneset = cloneDeep(blank);
      this.original = cloneDeep(blank);
      this.fresh = true;
      this.editable = true;
    }
  }
});
</script>
