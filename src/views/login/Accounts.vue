<template>
  <Section>
    <Center :vertical="true" width="200px">
      <Clickable
        icon="fab fa-github"
        text="With GitHub"
        design="big"
        @click="logIn('github')"
      />
      <Clickable
        icon="fas fa-graduation-cap"
        text="With ORCID"
        design="big"
        @click="logIn('github')"
      />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import { logIn } from "@/api/login";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable
  },
  methods: {
    async logIn(method = "") {
      await logIn(method);
      this.$store.dispatch("getUser");
    }
  }
});
</script>
