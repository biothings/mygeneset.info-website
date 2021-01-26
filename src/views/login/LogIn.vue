<template>
  <Section>
    <Center :vertical="true" width="250px">
      <Clickable icon="fas fa-graduation-cap" text="With ORCID" design="big" />
      <Clickable icon="fab fa-github" text="With GitHub" design="big" />
      <hr />
      <Clickable
        to="/guest"
        icon="fas fa-ghost"
        text="Use as Guest"
        design="big"
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
