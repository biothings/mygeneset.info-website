<template>
  <Header />
  <Main>
    <SignUp />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import SignUp from "./signup/SignUp.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    SignUp
  }
});
</script>
