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
    :options="options"
    :filterResults="false"
    :searchable="true"
    :limit="50"
    :delay="300"
    @open="(select: any) => select.refreshOptions()"
  >
    <!-- selected species -->
    <template #tag="{ option, handleTagRemove, disabled }">
      <button
        v-tippy="option.common + ' - ' + option.scientific"
        class="button"
        :disabled="disabled"
        @click.prevent
        @mousedown.prevent.stop="handleTagRemove(option, $event)"
      >
        <AppIcon v-if="option.icon" :icon="option.icon" class="icon" />
        <span v-if="option.common" class="common truncate">
          {{ option.common }}
        </span>
        <span v-if="option.scientific" class="scientific truncate">
          {{ option.scientific }}
        </span>
        <AppIcon icon="times" />
      </button>
    </template>

    <!-- species results/options -->
    <template #option="{ option }">
      <AppIcon v-if="option.icon" :icon="option.icon" class="icon" />
      <span v-if="option.common" class="common truncate">
        {{ option.common }}
      </span>
      <span v-if="option.scientific" class="scientific truncate">
        {{ option.scientific }}
      </span>
    </template>

    <!-- loading spinner -->
    <template #spinner>
      <span></span>
    </template>

    <!-- clear button -->
    <template #clear="{ clear }">
      <button class="clear" @click="clear">
        <AppIcon icon="times" />
      </button>
    </template>
  </Multiselect>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import { Species, searchSpecies } from "@/api/species";

// selected species
const selected = ref<Array<Species>>([]);

// get dropdown options
const options = async (query: string) =>
  (await searchSpecies(query)).species.map((species) => ({
    ...species,
    // for multiselect tracking
    full: species.common + " " + species.scientific,
  }));
</script>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: min(200px, 100%);
  padding: 2px 5px;
  border: none;
  border-radius: $rounded;
  background: $theme-light;
  font-size: 0.9rem;
  transition: background $fast;
}

.button:hover {
  background: $light-gray;
}

.clear {
  width: 36px;
  height: 36px;
  border: none;
  background: none;
}

.scientific {
  color: $off-black;
  font-size: 0.8rem;
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

.multiselect-clear {
  height: 40px;
}

.multiselect-dropdown {
  border: solid 2px $off-black;
  border-radius: 0 0 $rounded $rounded;
  overflow-y: auto;
}

.multiselect-option {
  display: flex;
  gap: 10px;
  padding: 5px 10px;
}

.multiselect-option.is-pointed {
  background: $theme-pale;
}

.multiselect-placeholder {
  color: $gray;
  white-space: nowrap;
  overflow: hidden;
}

.multiselect-caret {
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  margin: 8px;
}
</style>
