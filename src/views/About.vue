<template>
  <Header />
  <Main>
    <About />
    <SupportUs />
    <FAQs />
    <HowToCite />
    <TermsOfUse />
    <Team />
    <Contact />
  </Main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import About from "./about/About.vue";
import SupportUs from "./about/SupportUs.vue";
import FAQs from "./about/FAQs.vue";
import HowToCite from "./about/HowToCite.vue";
import TermsOfUse from "./about/TermsOfUse.vue";
import Team from "./about/Team.vue";
import Contact from "./about/Contact.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    About,
    SupportUs,
    FAQs,
    HowToCite,
    TermsOfUse,
    Team,
    Contact
  }
});
</script>
