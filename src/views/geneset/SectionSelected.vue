<template>
  <AppSection>
    <AppHeading level="3" icon="dna" link="genes">Genes</AppHeading>

    {{ genes.length.toLocaleString() }} selected genes

    <AppFlex v-if="genes.length" gap="small">
      <component
        :is="component"
        v-for="(gene, index) in expanded ? genes : genes.slice(0, top)"
        :key="index"
        v-tippy="
          [
            'Name: ' + (gene.name || '-'),
            'ID: ' + (gene.id || '-'),
            'Alias: ' + (gene.alias.join(', ') || '-'),
            'Symbol: ' + (gene.symbol.join(', ') || '-'),
            'Entrez: ' + (gene.entrezgene.join(', ') || '-'),
            'Ensembl: ' + (gene.ensemblgene.join(', ') || '-'),
            'Uniprot: ' + (gene.uniprot.join(', ') || '-'),
          ].join('<br/>')
        "
        :tabindex="0"
        class="selected"
        fill="filled"
        icon="times"
        design="fitted"
        @click="editable ? removeGene(gene) : null"
        >{{
          gene.name ||
          gene.id ||
          gene.alias[0] ||
          gene.symbol[0] ||
          gene.entrezgene[0] ||
          gene.ensemblgene[0] ||
          gene.uniprot[0]
        }}</component
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
import { Gene } from "@/api/genes";
import { Geneset } from "@/api/genesets";

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
const component = computed(() => (props.editable ? "AppButton" : "span"));
</script>

<style scoped lang="scss">
span.selected {
  padding: 2px 5px;
  border: solid 2px $light-gray;
  border-radius: $rounded;
}
</style>
