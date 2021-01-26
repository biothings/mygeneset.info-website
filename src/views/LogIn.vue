<template>
  <Header />
  <Main title="Log In / Sign Up" icon="far fa-user-circle">
    <LogIn />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import LogIn from "./login/LogIn.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    LogIn
  }
});
</script>
