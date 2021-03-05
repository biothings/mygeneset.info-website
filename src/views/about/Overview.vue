<template>
  <Section>
    <!-- high-level description of app and api -->
    <p>
      MyGeneset allows scientists to conveniently collect, save, and share sets
      of genes from thousands of different species. You can use it through this
      website or programmatically through the
      <router-link to="API">API</router-link>.
    </p>
    <p>
      Use MyGeneset to:
    </p>
    <!-- key, distilled, succinct use-cases of app and api -->
    <ul>
      <li>analyze large genomic data without programming experience</li>
      <li>
        collect genes of interest once and easily access/export as multiple
        formats
      </li>
      <li>store and discuss genesets in a central location</li>
      <li>
        develop your own gene-centric applications and offload the search and
        write capabilities
      </li>
      <li>...and much more!</li>
    </ul>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";

export default defineComponent({
  components: {
    Section
  }
});
</script>
