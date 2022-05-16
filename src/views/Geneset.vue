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
import { sleep } from "@/util/debug";

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
    // load geneset from id in url, or blank if on /new
    async load() {
      if (this.$route.params.id) {
        this.loading = true;
        try {
          this.geneset = await lookup(this.$route.params.id as string);
          this.original = cloneDeep(this.geneset);
        } catch (error) {
          this.error = true;
        } finally {
          this.loading = false;
        }
        this.fresh = false;
        this.editable = this.geneset.author === this.$store.state.username;
      } else {
        const blank: Geneset = {
          _id: "",
          name: "",
          author: this.$store.state.username,
          updated: new Date().toLocaleString(),
          description: "",
          is_public: true,
          genes: []
        };

        this.geneset = cloneDeep(blank);
        this.original = cloneDeep(blank);
        this.fresh = true;
        this.editable = true;
      }
    },
    // add gene to set
    add(cell: undefined, row: Gene) {
      if (this.geneset.genes) this.geneset.genes?.push(row);
      else this.geneset.genes = [row];
    },
    // remove gene from set
    remove(cell: undefined, row: Gene) {
      const match = (gene: Gene) => gene.mygene_id || row.mygene_id;
      const index = (this.geneset?.genes || []).findIndex(match) || -1;
      this.geneset?.genes?.splice(index, 1);
    },
    // update geneset
    async update() {
      const {
        _id,
        name = "",
        description = "",
        is_public = false,
        genes = []
      } = this.geneset;

      if (!name.trim()) {
        window.alert("Please enter a name for this geneset!");
        return;
      }

      if (this.fresh) {
        if (!window.confirm("Are you sure you want to create this geneset?"))
          return;
      } else {
        if (!window.confirm("Are you sure you want to update this geneset?"))
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

      // wait for database to refresh
      await sleep(1000);
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

      // wait for database to refresh
      await sleep(1000);
      // go back to build page
      if (success) this.$router.push("/build");
    }
  },
  watch: {
    // run load when certain props change
    "$route.params.id"() {
      this.load();
    },
    "$store.state.username"() {
      this.load();
    }
  },
  mounted() {
    this.load();
  }
});
</script>
