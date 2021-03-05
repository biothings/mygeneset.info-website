<template>
  <Section>
    <Center width="200px">
      <Clickable
        to="https://docs.mygeneset.info/en/latest/index.html"
        icon="fas fa-book"
        text="API Docs"
        design="big"
      />
      <div class="version">v1.0</div>
    </Center>
    <p>
      Full documentation for using MyGeneset programmatically through its API.
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

<style scope lang="scss">
.version {
  min-width: unset;
  margin: 0;
}
</style>
