<template>
  <Header v-bind:big="true" />
  <Main>
    <Hero />
    <GetStarted />
    <API />
    <Features />
    <WhosUsing />
    <WhatsNew />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import Hero from "./home/Hero.vue";
import GetStarted from "./home/GetStarted.vue";
import API from "./home/API.vue";
import Features from "./home/Features.vue";
import WhosUsing from "./home/WhosUsing.vue";
import WhatsNew from "./home/WhatsNew.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Hero,
    GetStarted,
    API,
    Features,
    WhosUsing,
    WhatsNew
  }
});
</script>
