<template>
  <Header />
  <Main title="Build" icon="fas fa-cube">
    <BuildNew />
    <YourGenesets />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import BuildNew from "./build/BuildNew.vue";
import YourGenesets from "./build/YourGenesets.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    BuildNew,
    YourGenesets
  }
});
</script>
