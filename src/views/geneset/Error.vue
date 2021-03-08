<template>
  <!-- error message -->
  <Section>
    <Center>
      <span class="error">
        <i class="fas fa-exclamation-circle"></i>
        <span>Couldn't find geneset</span>
      </span>
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";

export default defineComponent({
  components: {
    Section,
    Center
  }
});
</script>
