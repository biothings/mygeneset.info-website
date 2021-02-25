<template>
  <Header />
  <Main>
    <Hero />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import Hero from "@/views/api/Hero.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Hero
  }
});
</script>
