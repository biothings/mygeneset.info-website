<template>
  <Section>
    <h2>Use As Guest</h2>
    <p>
      To browse or build genesets as a guest, just go to the browse or build
      pages without logging in. Without an account, you won’t be able to create
      private genesets or edit genesets after you’ve created them.
    </p>
    <Center width="200px">
      <Clickable to="/browse" icon="fas fa-search" text="Browse" design="big" />
      <Clickable to="/build" icon="fas fa-cube" text="Build" design="big" />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable
  }
});
</script>
