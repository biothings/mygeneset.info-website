<template>
  <Section>
    <Hero icon="fas fa-dna">
      <template v-slot:ATop>{{ (96290).toLocaleString() }}</template>
      <template v-slot:ABottom>genesets created</template>
      <template v-slot:BTop>{{ (720024).toLocaleString() }}</template>
      <template v-slot:BBottom>API requests in last 30 days</template>
    </Hero>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Hero from "@/components/Hero.vue";

export default defineComponent({
  components: {
    Section,
    Hero
  }
});
</script>
