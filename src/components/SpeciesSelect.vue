<template>
  <Multiselect
    v-model="value"
    :options="search"
    mode="tags"
    :placeholder="placeholder"
    :searchable="true"
    valueProp="key"
    trackBy="label"
    :caret="false"
    :limit="100"
    :delay="300"
  >
    <template v-slot:tag="{ option, remove, disabled }">
      <button
        class="multiselect-tag is-user"
        @click.prevent
        @mousedown.prevent.stop="remove(option)"
        :disabled="disabled"
      >
        <img v-if="option.icon" :src="option.icon" class="species_icon" />
        <span>{{ option.label }}</span>
        <i class="fas fa-times"></i>
      </button>
    </template>
    <template v-slot:option="{ option }">
      <img v-if="option.icon" :src="option.icon" class="species_icon" />
      <span>{{ option.label }}</span>
    </template>
  </Multiselect>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Multiselect from "@vueform/multiselect";
import { search } from "@/api/species";
import { Json } from "@/api";

const context = require.context("@/assets/species", false, /\.svg$/);
const icons = context.keys().map(context) as string[];
const findIcon = (name: string) => {
  const pattern = new RegExp(`${name}\\.[A-Za-z0-9]*\\.svg`);
  return icons.find((icon: string) => icon.match(pattern));
};

export default defineComponent({
  props: {
    placeholder: String
  },
  components: {
    Multiselect
  },
  data() {
    return {
      value: null
    };
  },
  methods: {
    async search(query: string) {
      return (await search(query)).map((species: Json) => {
        const key: string = species._id;
        const scientific: string = species.scientific_name;
        let common: string | string[] = species.common_name;
        if (Array.isArray(common)) common = common[0];
        const label = scientific + (common ? ` (${common})` : "");
        const icon = findIcon(scientific);
        return { key, label, icon };
      });
    }
  }
});
</script>

<style lang="scss">
@mixin height {
  min-height: 40px - 2px - 2px;
}

.species_icon {
  width: 15px;
  height: 15px;
  margin-right: 8px;
}

.multiselect {
  position: relative;
  width: 100%;
  @include height;

  &.is-open {
    .multiselect-input {
      border-radius: 5px 5px 0 0;
    }
  }

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
        margin: 5px;
        padding: 3px 8px;
        border-radius: 5px;
        font-size: 0.9rem;
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
    border-top: none;
    border-radius: 0 0 5px 5px;
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
