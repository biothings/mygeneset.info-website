<template>
  <Section>
    <Gallery>
      <Feature
        icon="far fa-laugh"
        title="Easy to use"
        description="Create and access genesets from a simple interface"
      />
      <Feature
        icon="fas fa-running"
        title="Ready to go"
        description="20+ species and 20+ sets pre-integrated from curated sources"
      />
      <Feature
        icon="far fa-clock"
        title="Up-to-date"
        description="Latest genes and genesets imported every week"
      />
    </Gallery>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Gallery from "@/components/Gallery.vue";
import Feature from "@/components/Feature.vue";

export default defineComponent({
  components: {
    Section,
    Gallery,
    Feature
  }
});
</script>
