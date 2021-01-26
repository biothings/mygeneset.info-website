<template>
  <Section>
    <h2 id="get-started">Get Started</h2>
    <Placeholder>
      table of popular/recent genesets with columns:<br />
      title (links to geneset page), species, gene count, creator, truncated
      description
    </Placeholder>
    <Center width="200px">
      <Clickable
        to="/browse"
        icon="fas fa-search"
        text="Browse All"
        design="big"
      />
      <Clickable
        to="/build"
        icon="fas fa-cube"
        text="Build Your Own"
        design="big"
      />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Clickable from "@/components/Clickable.vue";
import Center from "@/components/Center.vue";
import Placeholder from "@/components/Placeholder.vue";

export default defineComponent({
  components: {
    Section,
    Clickable,
    Center,
    Placeholder
  }
});
</script>
