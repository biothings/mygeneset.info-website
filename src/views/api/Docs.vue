<template>
  <Section>
    <Center class="docs">
      <Clickable
        to="https://docs.mygeneset.info/en/latest/index.html"
        icon="fas fa-book"
        text="API Docs"
        design="big"
      />
      <div>v1.0</div>
    </Center>
    <p>
      Full documentation for using My Geneset programmatically through its API.
      Detailed info about request parameters, response schemas, and more.
    </p>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Clickable from "@/components/Clickable.vue";
import Center from "@/components/Center.vue";

export default defineComponent({
  components: {
    Section,
    Clickable,
    Center
  }
});
</script>

<style scoped lang="scss"></style>
