<template>
  <Section>
    <h2>Your Genesets</h2>
    <Placeholder>
      table of your genesets with search/filter functionality
    </Placeholder>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Placeholder from "@/components/Placeholder.vue";

export default defineComponent({
  components: {
    Section,
    Placeholder
  }
});
</script>

<style scoped lang="scss"></style>
