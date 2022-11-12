<template>
  <AppSection>
    <AppHeading level="3" icon="dna" link="genes">Genes</AppHeading>

    <!-- note -->
    {{ genes.length.toLocaleString() }} selected genes

    <!-- filters -->
    <AppFlex>
      <!-- search -->
      <AppFlex flow="inline" gap="small">
        <AppInput
          v-model="search"
          placeholder="Search selected genes"
          class="search"
          :clearable="true"
        />
        <template v-if="_genes.length !== genes.length">
          {{ _genes.length.toLocaleString() }} matches
        </template>
      </AppFlex>

      <!-- sort -->
      <AppFlex flow="inline" gap="small">
        Sort by:
        <AppSelect v-model="sort" :options="sortOptions" />
      </AppFlex>
    </AppFlex>

    <!-- list of genes -->
    <AppFlex v-if="_genes.length" gap="small">
      <component
        :is="component"
        v-for="(gene, index) in expanded ? _genes : _genes.slice(0, top)"
        :key="index"
        v-tippy="getGeneTooltip(gene)"
        :tabindex="0"
        fill="filled"
        :icon="editable ? 'times' : ''"
        design="fitted"
        @click="editable ? removeGenes(gene) : null"
        >{{ getGeneLabel(gene) }}</component
      >
    </AppFlex>

    <!-- expand button -->
    <AppButton
      v-if="_genes.length > top"
      :icon="expanded ? 'angle-double-up' : 'angle-double-down'"
      :text="expanded ? 'Show less' : 'Show all'"
      @click="expanded = !expanded"
    />

    <!-- note -->
    {{ species.length.toLocaleString() }} species

    <!-- species -->
    <AppFlex gap="tiny">
      <AppPill
        v-for="(s, index) in species"
        :key="index"
        v-tippy="getSpeciesTooltip(s)"
        :icon="s.icon"
      >
        {{ getSpeciesLabel(s) }}</AppPill
      >
    </AppFlex>
  </AppSection>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { sortBy } from "lodash";
import { flattenGeneId, Gene, getGeneLabel, getGeneTooltip } from "@/api/genes";
import { Geneset } from "@/api/genesets";
import AppButton from "@/components/AppButton.vue";
import AppPill from "@/components/AppPill.vue";
import AppInput from "@/components/AppInput.vue";
import AppSelect, { Options } from "@/components/AppSelect.vue";
import { getSpeciesLabel, getSpeciesTooltip, Species } from "@/api/species";

interface Props {
  // selected genes (current geneset genes)
  genes: Geneset["genes"];
  // whether geneset is editable
  editable: boolean;
  // gene manipulation functions from parent
  removeGenes: (...genes: Array<Gene>) => void;
  // unique species in selected genes
  species: Array<Species>;
}

const props = defineProps<Props>();

// show this many selected genes before truncating
const top = 20;

// show all selected genes
const expanded = ref(false);

// search string to filter by
const search = ref("");

// sort mode options
const sortOptions: Options = [
  { key: "added", text: "Order Added" },
  { key: "alphabetical", text: "Alphabetical" },
];

// selected sort mode
const sort = ref(sortOptions[0].key);

// component to use for each selected gene
const component = computed(() => (props.editable ? AppButton : AppPill));

// filtered/sorted gene list
const _genes = computed(() => {
  let genes = props.genes;

  // search by string
  if (search.value)
    genes = genes.filter((gene) =>
      // all gene identifier values
      Object.values(gene)
        // flatten because some identifier fields are arrays instead of pure string
        .flat()
        // see if any entry in flat array includes search string
        .some((value) =>
          String(value).toLowerCase().includes(search.value.toLowerCase())
        )
    );

  // sort
  if (sort.value === "alphabetical")
    genes = sortBy(genes, [
      (gene) => flattenGeneId(gene.symbol),
      (gene) => flattenGeneId(gene.name),
    ]);

  return genes;
});
</script>

<style scoped lang="scss">
.search {
  width: 300px;
}
</style>
