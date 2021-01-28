<template>
  <Multiselect
    v-model="value"
    :options="options"
    mode="tags"
    :placeholder="placeholder"
    :searchable="true"
    valueProp="search"
    trackBy="search"
  >
    <template v-slot:tag="{ option, remove, disabled }">
      <button
        class="multiselect-tag is-user"
        @click.prevent
        @mousedown.prevent.stop="remove(option)"
        :disabled="disabled"
      >
        <img :src="option.icon" class="species_icon" />
        <span>{{ option.species }} ({{ option.name }})</span>
        <i class="fas fa-times"></i>
      </button>
    </template>
    <template v-slot:option="{ option }">
      <img :src="option.icon" class="species_icon" />
      <span>{{ option.name }} ({{ option.species }})</span>
    </template>
  </Multiselect>
</template>

<script>
import { defineComponent } from "vue";
import Multiselect from "@vueform/multiselect";

import human from "@/assets/species/human.svg";
import brewersYeast from "@/assets/species/brewers-yeast.svg";
import houseMouse from "@/assets/species/house-mouse.svg";
import brownRat from "@/assets/species/brown-rat.svg";
import roundworm from "@/assets/species/roundworm.svg";
import thaleCress from "@/assets/species/thale-cress.svg";
import fruitFly from "@/assets/species/fruit-fly.svg";
import zebrafish from "@/assets/species/zebrafish.svg";
import pseudomonas from "@/assets/species/pseudomonas.svg";

// dummy species. to be replaced by api call
const species = [
  { name: "Human", species: "Homo sapiens", icon: human },
  {
    name: "Brewer's Yeast",
    species: "Saccharomyces cerevisiae",
    icon: brewersYeast
  },
  { name: "House Mouse", species: "Mus musculus", icon: houseMouse },
  { name: "Brown Rat", species: "Rattus norvegicus", icon: brownRat },
  {
    name: "Roundworm",
    species: "Caenorhabditis elegans",
    icon: roundworm
  },
  {
    name: "Thale Cress",
    species: "Arabidopsis thaliana",
    icon: thaleCress
  },
  {
    name: "Fruit Fly",
    species: "Drosophila melanogaster",
    icon: fruitFly
  },
  { name: "Zebrafish", species: "Danio rerio", icon: zebrafish },
  {
    name: "Pseudomonas",
    species: "Pseudomonas aeruginosa",
    icon: pseudomonas
  }
];
species.forEach(s => (s.search = s.name + " " + s.species));

export default defineComponent({
  props: {
    placeholder: String
  },
  components: {
    Multiselect
  },
  data() {
    return {
      value: null,
      options: species
    };
  }
});
</script>

<style lang="scss">
@mixin height {
  min-height: 40px;
}

.species_icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.multiselect {
  position: relative;
  width: 100%;
  @include height;

  .multiselect-input {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    @include height;
    background: $white;
    border: solid $light-gray 2px;
    border-radius: 5px;
    transition: border-color $fast;

    &:hover,
    &:focus {
      border-color: $black;
    }

    .multiselect-placeholder {
      position: absolute;
      width: 100%;
      @include height;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 10px;
      color: $gray;
    }

    .multiselect-tags {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      @include height;
      z-index: 1;

      .multiselect-tag {
        display: flex;
        align-items: center;
        min-height: 30px;
        margin: 5px;
        padding: 5px 10px;
        border-radius: 5px;
        background: $theme-pale;

        .fa-times {
          margin-left: 10px;
        }
      }

      .multiselect-search {
        flex-grow: 1;
        min-width: 40px;
        @include height;

        input {
          width: 100% !important;
          @include height;
          padding: 0 10px;
          outline: none;
        }
      }
    }
  }

  .multiselect-options {
    position: absolute;
    left: 0;
    right: 0;
    border: solid $light-gray 2px;
    border-radius: 5px;
    margin-top: -2px;
    max-height: 200px;
    overflow-x: auto;
    overflow-y: auto;
    z-index: 100;
    background: $white;

    .multiselect-option {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @include height;
      padding: 0 10px;
      color: $black;
      text-decoration: none;
      white-space: nowrap;

      &.is-pointed {
        background: $theme-pale;
      }
    }

    .multiselect-no-results,
    .multiselect-no-options {
      display: flex;
      justify-content: center;
      align-items: center;
      @include height;
    }
  }
}
</style>
