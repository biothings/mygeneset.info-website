<template>
  <Section>
    <h1 id="news">What's New</h1>
    <Placeholder>
      Twitter embed to show tweets, or link to blog posts with summaries
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
