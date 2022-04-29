<template>
  <Section>
    <Center :vertical="true" width="200px">
      <Clickable
        icon="fas fa-graduation-cap"
        text="With ORCID"
        design="big"
        @click="login('github')"
      />
      <Clickable
        icon="fab fa-github"
        text="With GitHub"
        design="big"
        @click="login('orcid')"
      />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import { login } from "@/api/login";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable
  },
  methods: {
    login
  }
});
</script>
