<template>
  <!-- /about page -->
  <Header />
  <Main title="About" icon="fas fa-signature">
    <Overview />
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
import Overview from "@/views/about/Overview.vue";
import SupportUs from "@/views/about/SupportUs.vue";
import FAQs from "@/views/about/FAQs.vue";
import HowToCite from "@/views/about/HowToCite.vue";
import TermsOfUse from "@/views/about/TermsOfUse.vue";
import Team from "@/views/about/Team.vue";
import Contact from "@/views/about/Contact.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
    Overview,
    SupportUs,
    FAQs,
    HowToCite,
    TermsOfUse,
    Team,
    Contact
  }
});
</script>
