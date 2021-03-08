<template>
  <!--  loading spinner -->
  <Section>
    <Center>
      <span class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <span>Loading geneset details</span>
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
