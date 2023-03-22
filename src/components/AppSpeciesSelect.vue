<!--
  species multi-select search box
-->

<template>
  <Multiselect
    ref="multiselect"
    v-model="selected"
    class="multiselect"
    mode="tags"
    value-prop="id"
    no-options-text="No results"
    no-results-text="No results"
    :resolve-on-load="false"
    :options="options"
    :filterResults="false"
    :searchable="true"
    :can-clear="false"
    :limit="50"
    :delay="300"
    :caret="false"
    @open="(select: any) => select.refreshOptions()"
  >
    <!-- selected species -->
    <template #tag="{ option, handleTagRemove, disabled }">
      <AppButton
        v-tippy="getSpeciesTooltip(option)"
        class="button"
        icon="times"
        fill="filled"
        :disabled="disabled"
        @click.prevent="() => null"
        @mousedown.prevent.stop="handleTagRemove(option, $event)"
      >
        <AppIcon v-if="option.icon" :icon="option.icon" class="icon" />
        <span v-if="option.scientific" class="scientific truncate">
          {{ getSpeciesLabel(option) }}
        </span>
        <span v-if="option.secondary" class="secondary truncate">
          {{ option.secondary.join(", ") }}
        </span>
      </AppButton>
    </template>

    <!-- species results/options -->
    <template #option="{ option }">
      <div v-tippy="getSpeciesTooltip(option)" class="result">
        <AppIcon v-if="option.icon" :icon="option.icon" class="icon" />
        <span v-if="option.scientific" class="scientific truncate">
          {{ getSpeciesLabel(option) }}
        </span>
        <span v-if="option.secondary" class="secondary truncate">
          {{ option.secondary.join(", ") }}
        </span>
      </div>
    </template>

    <!-- spinner -->
    <template #spinner>{{ "loading" }}</template>
  </Multiselect>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import {
  Species,
  searchSpecies,
  getSpeciesTooltip,
  getSpeciesLabel,
} from "@/api/species";

// selected species
const selected = ref<Array<Species>>([]);

// get dropdown options
const options = async (query: string) => {
  try {
    return (await searchSpecies(query, true)).species.map((species) => ({
      ...species,
      // for multiselect tracking
      full: species.scientific + " " + species.secondary,
    }));
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
.button {
  max-width: min(100%, 200px);
  gap: 8px;
  padding: 2px 5px !important;
}

.scientific {
  min-width: max-content;
}

.secondary {
  min-width: 50px;
  color: $dark-gray;
  font-size: 0.8rem;
}

.result {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 5px 10px;
}
</style>

<style lang="scss">
.multiselect {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: solid 2px $off-black;
  border-radius: $rounded;
  transition: box-shadow $fast;
}

.multiselect.is-active {
  box-shadow: 0 0 0 2px $theme;
}

.multiselect-tags {
  gap: 10px;
  max-width: calc(100% - 40px);
  margin: 0;
  padding: 7px 10px;
}

.multiselect-tags-search-wrapper {
  min-height: 22px;
  margin: 0;
}

.multiselect-tags-search {
  background: none;
}

.multiselect-dropdown {
  border: solid 2px $off-black;
  border-radius: 0 0 $rounded $rounded;
  overflow-y: auto;
}

.multiselect-option {
  padding: 0;
}

.multiselect-option.is-pointed {
  background: $theme-pale;
}

.multiselect-placeholder {
  color: $gray;
  white-space: nowrap;
  overflow: hidden;
}

.multiselect-spinner {
}
</style>
