<template>
  <Header />
  <Main title="Your Profile" icon="far fa-user-circle">
    <Profile />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import Profile from "@/views/user/Profile.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Profile
  }
});
</script>
