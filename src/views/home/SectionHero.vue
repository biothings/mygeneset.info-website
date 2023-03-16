<template>
  <AppSection>
    <AppHero icon="dna">
      <template #aTop>
        {{ $store.state.metadata?.stats.total?.toLocaleString() || "-" }}
      </template>

      <template #aBottom>total genesets</template>

      <template #bTop>
        {{ $store.state.metadata?.stats.curated?.toLocaleString() || "-" }}
      </template>

      <template #bBottom>curated genesets</template>
    </AppHero>
    <AppHero icon="dna">
      <template #aTop>
        {{ $store.state.metadata?.stats.user?.toLocaleString() || "-" }}
      </template>

      <template #aBottom>user genesets</template>

      <template #bTop>
        {{ $store.state.metadata?.stats.anonymous?.toLocaleString() || "-" }}
      </template>

      <template #bBottom>anonymous genesets</template>
    </AppHero>
  </AppSection>
</template>

<script setup lang="ts">
import AppHero from "@/components/AppHero.vue";
</script>
