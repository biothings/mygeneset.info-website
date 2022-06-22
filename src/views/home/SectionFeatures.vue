<template>
  <AppSection>
    <AppHeading level="2">Features</AppHeading>

    <AppGallery>
      <AppFlex
        v-for="(feature, index) in features"
        :key="index"
        class="feature"
        direction="col"
      >
        <AppIcon :icon="feature.icon" class="icon" />
        <div class="title">{{ feature.title }}</div>
        <div>{{ feature.description }}</div>
      </AppFlex>
    </AppGallery>
  </AppSection>
</template>

<script setup lang="ts">
import AppGallery from "@/components/AppGallery.vue";

const features = [
  {
    icon: "face-laugh-beam",
    title: "Easy to use",
    description: "Create and access genesets from a simple interface",
  },
  {
    icon: "person-running",
    title: "Ready to go",
    description:
      "Thousands of supported species and built-in sets from curated sources",
  },
  {
    icon: "clock",
    title: "Up-to-date",
    description: "Latest genes and genesets imported every week",
  },
];
</script>

<style scoped lang="scss">
.icon {
  color: $theme;
  font-size: 3rem;
}

.title {
  font-weight: $medium;
}
</style>
