<template>
  <AppSection>
    <AppHero icon="dna">
      <template #aTop>
        {{ userGenesets ? userGenesets.toLocaleString() : "???" }}
      </template>

      <template #aBottom>user genesets</template>

      <template #bTop>
        {{ curatedGenesets ? curatedGenesets.toLocaleString() : "???" }}
      </template>

      <template #bBottom>curated genesets</template>
    </AppHero>
  </AppSection>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import AppHero from "@/components/AppHero.vue";
import { computed } from "@vue/reactivity";

const store = useStore();

const userGenesets = computed(() => store.state.metadata?.userGenesets);
const curatedGenesets = computed(() => store.state.metadata?.curatedGenesets);
</script>
