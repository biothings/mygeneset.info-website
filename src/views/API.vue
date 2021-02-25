<template>
  <Header />
  <Main title="API" icon="fas fa-terminal">
    <Details />
    <Docs />
    <TryItOut />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import Details from "@/views/api/Details.vue";
import Docs from "@/views/api/Docs.vue";
import TryItOut from "@/views/api/TryItOut.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Details,
    Docs,
    TryItOut
  }
});
</script>
