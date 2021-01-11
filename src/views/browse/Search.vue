<template>
  <Section>
    <GenesetSearch />
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import GenesetSearch from "@/components/GenesetSearch.vue";

export default defineComponent({
  components: {
    Section,
    GenesetSearch
  }
});
</script>

<style scoped lang="scss"></style>
