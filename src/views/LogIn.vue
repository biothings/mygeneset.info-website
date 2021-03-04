<template>
  <!-- /login page -->
  <Header />
  <Main title="Log In / Sign Up" icon="fas fa-sign-in-alt">
    <Accounts />
    <UseAsGuest />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import Accounts from "@/views/login/Accounts.vue";
import UseAsGuest from "@/views/login/UseAsGuest.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Accounts,
    UseAsGuest
  }
});
</script>
