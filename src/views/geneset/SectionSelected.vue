<template>
  <AppSection>
    <AppHeading level="3" icon="dna" link="genes">Genes</AppHeading>

    {{ genes.length.toLocaleString() }} selected genes

    <AppFlex v-if="genes.length" gap="small">
      <component
        :is="component"
        v-for="(gene, index) in expanded ? genes : genes.slice(0, top)"
        :key="index"
        v-tippy="getGeneTooltip(gene)"
        :tabindex="0"
        fill="filled"
        icon="times"
        design="fitted"
        @click="editable ? removeGene(gene) : null"
        >{{ getGeneLabel(gene) }}</component
      >
    </AppFlex>

    <AppButton
      v-if="genes.length > top"
      :icon="expanded ? 'angle-double-up' : 'angle-double-down'"
      :text="expanded ? 'Show less' : 'Show all'"
      @click="expanded = !expanded"
    />
  </AppSection>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Gene, getGeneLabel, getGeneTooltip } from "@/api/genes";
import { Geneset } from "@/api/genesets";
import AppButton from "@/components/AppButton.vue";
import AppPill from "@/components/AppPill.vue";

interface Props {
  // selected genes (current geneset genes)
  genes: Geneset["genes"];
  // whether geneset is editable
  editable: boolean;
  // gene manipulation functions from parent
  removeGene: (gene: Gene) => void;
}

const props = defineProps<Props>();

// show this many selected genes before truncating
const top = 20;

// show all selected genes
const expanded = ref(false);

// component to use for each selected gene
const component = computed(() => (props.editable ? AppButton : AppPill));
</script>
