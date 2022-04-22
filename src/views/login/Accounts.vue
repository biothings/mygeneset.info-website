<template>
  <Section>
    <Center :vertical="true" width="200px">
      <Clickable
        icon="fab fa-github"
        text="With GitHub"
        design="big"
        to="https://mygeneset.info/login/github"
      />
      <Clickable
        icon="fas fa-graduation-cap"
        text="With ORCID"
        design="big"
        to="https://mygeneset.info/login/orcid"
      />
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
