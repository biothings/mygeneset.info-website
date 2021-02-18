<template>
  <Header />
  <Main title="Geneset" icon="fas fa-dna">
    <GenesetEdit :editable="true" :fresh="false" />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import GenesetEdit from "@/components/GenesetEdit.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    GenesetEdit
  }
});
</script>
