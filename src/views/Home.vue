<template>
  <!-- home page -->
  <Header :big="true" />
  <Main>
    <Details />
    <GetStarted />
    <API />
    <Features />
    <!-- ADD BACK IN WHEN WE HAVE MORE USERS -->
    <!-- <WhosUsing /> -->
    <WhatsNew />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import Details from "@/views/home/Details.vue";
import GetStarted from "@/views/home/GetStarted.vue";
import API from "@/views/home/API.vue";
import Features from "@/views/home/Features.vue";
// import WhosUsing from "@/views/home/WhosUsing.vue";
import WhatsNew from "@/views/home/WhatsNew.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Details,
    GetStarted,
    API,
    Features,
    // WhosUsing,
    WhatsNew
  }
});
</script>
