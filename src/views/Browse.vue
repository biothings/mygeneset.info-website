<template>
  <Header />
  <Main title="Browse" icon="fas fa-search">
    <Search />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import Search from "./browse/Search.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Search
  }
});
</script>
