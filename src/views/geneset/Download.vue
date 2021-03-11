<template>
  <Section>
    <Center v-if="expanded" width="100%">Options</Center>
    <Center :vertical="true" width="200px">
      <Clickable
        :text="expanded ? 'Hide Options' : 'Format Options'"
        icon="fas fa-cog"
        design="plain"
        @click="expanded = !expanded"
      />
      <Clickable text="Download" icon="fas fa-download" design="big" />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import { Geneset } from "@/api/types";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable
  },
  props: {
    // current geneset
    geneset: Object as PropType<Geneset>
  },
  data() {
    return {
      // format options expanded state
      expanded: false
    };
  }
});
</script>
