<template>
  <Header />
  <Main>
    <UseAsGuest />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import UseAsGuest from "./guest/UseAsGuest.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    UseAsGuest
  }
});
</script>
