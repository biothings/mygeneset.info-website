<template>
  <div class="geneset_search">
    <Center :vertical="true" width="100%">
      <TextBox :placeholder="placeholder" v-model="keywords" />
      <div v-if="expanded" class="geneset_species">
        <label v-for="(value, name, index) in species" :key="index">
          <input type="checkbox" v-model="value.selected" />
          <span>{{ value.name }}</span>
          <span>({{ value.species }})</span>
        </label>
      </div>
      <Clickable
        @click="expanded = !expanded"
        icon="fas fa-cog"
        :text="expanded ? 'Simple Search' : 'Advanced Search'"
        design="plain"
      />
    </Center>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextBox from "@/components/TextBox.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";

// dummy species. to be replaced by api call
const species = [
  { name: "Humans", species: "Homo sapiens", selected: true },
  {
    name: "Brewer's Yeast",
    species: "Saccharomyces cerevisiae",
    selected: true
  },
  { name: "House Mouse", species: "Mus musculus", selected: true },
  { name: "Brown Rat", species: "Rattus norvegicus", selected: true },
  { name: "Roundworm", species: "Caenorhabditis elegans", selected: true },
  { name: "Thale Cress", species: "Arabidopsis thaliana", selected: true },
  { name: "Fruit Fly", species: "Drosophila melanogaster", selected: true },
  { name: "Zebrafish", species: "Danio rerio", selected: true },
  { name: "Pseudomonas", species: "Pseudomonas aeruginosa", selected: true }
];

export default defineComponent({
  components: {
    TextBox,
    Center,
    Clickable
  },
  props: {
    placeholder: String
  },
  data() {
    return {
      expanded: false,
      keywords: "",
      species
    };
  }
});
</script>

<style scoped lang="scss">
.geneset_search {
  margin: 0 auto;

  .geneset_species {
    label {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 2px 10px;

      input {
        margin-right: 10px;
      }

      span:last-child {
        margin-left: 5px;
        font-size: 0.8rem;
        color: $gray;
      }
    }
  }
}
</style>
