<template>
  <Section>
    <h2 id="api">API</h2>
    <Center>Use MyGeneset programatically</Center>
    <Placeholder>
      table of popular/recent queries with columns:<br />
      request, parameters, country, time took
    </Placeholder>
    <Center width="200px">
      <Clickable to="/api" icon="fas fa-terminal" text="Try Now" design="big" />
      <Clickable
        to="https://docs.mygeneset.info/en/latest/index.html"
        icon="fas fa-book"
        text="API Docs"
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
