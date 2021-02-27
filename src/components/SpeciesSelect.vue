<template>
  <Multiselect
    v-model="value"
    :options="search"
    mode="tags"
    :searchable="true"
    trackBy="search"
    :placeholder="placeholder"
    valueProp="key"
    :caret="false"
    :limit="100"
    :delay="300"
    noOptionsText="No results"
    noResultsText="No results"
    @open="refresh"
    ref="multiselect"
  >
    <template v-slot:tag="{ option, handleTagRemove, disabled }">
      <button
        class="multiselect-tag is-user"
        @click.prevent
        @mousedown.prevent.stop="handleTagRemove(option, $event)"
        :disabled="disabled"
      >
        <img v-if="option.icon" :src="option.icon" class="icon" />
        <span v-if="option.scientific || option.common" class="name">
          <span v-if="option.scientific" class="scientific">{{
            option.scientific
          }}</span>
          <span v-if="option.common" class="common">{{ option.common }}</span>
        </span>
        <i class="fas fa-times"></i>
      </button>
    </template>
    <template v-slot:option="{ option }">
      <span v-if="option.message" class="message">{{ option.message }}</span>
      <img v-if="option.icon" :src="option.icon" class="icon" />
      <span v-if="option.scientific || option.common" class="name">
        <span
          v-if="option.scientific"
          class="scientific"
          v-tooltip.slow="`Tax ID: ${option.key}`"
          >{{ option.scientific }}</span
        >
        <span v-if="option.common" class="common">{{ option.common }}</span>
      </span>
    </template>
  </Multiselect>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Multiselect from "@vueform/multiselect";
import { search } from "@/api/species";
import { top as getTop } from "@/api/species";
import { Json } from "@/api";

interface MultiselectType {
  refreshOptions: Function;
}

const context = require.context("@/assets/species", false, /\.svg$/);
const icons = context.keys().map(context) as string[];
const findIcon = (name: string) => {
  const pattern = new RegExp(`${name}\\.[A-Za-z0-9]*\\.svg`);
  return icons.find((icon: string) => icon.match(pattern));
};

let top: Json = [];
const setTop = async () => (top = await getTop());
setTop();

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
      let results;
      if (query) results = await search(query);
      else results = top || [];

      const formatResult = (results: Json) => {
        const key: string = results._id;
        const scientific: string = results.scientific_name;
        const common: string = [
          results.genbank_common_name,
          results.common_name,
          results.other_names
        ]
          .flat()
          .filter(name => name)
          .join(", ");
        const search = key + scientific + common;
        const icon = findIcon(scientific);
        return { key, scientific, common, search, icon };
      };
      results = results.map(formatResult);
      return results;
    },
    refresh() {
      (this.$refs.multiselect as MultiselectType)?.refreshOptions();
    }
  }
});
</script>

<style scope lang="scss">
$height: 40px - 2px - 2px;

.icon {
  width: 15px;
  height: 15px;
}

.name {
  flex-grow: 1;
  @include truncate;

  .scientific {
    font-weight: $medium;
  }

  .common {
    color: $gray;
    font-size: 0.8em;
    font-style: italic;
  }
}

.multiselect {
  position: relative;
  width: 100%;
  min-height: $height;

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
    min-height: $height;
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
      min-height: $height;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 10px;
      color: $gray;
      @include truncate;
    }

    .multiselect-tags {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      min-height: $height;
      z-index: 1;

      .multiselect-tag {
        display: flex;
        align-items: center;
        max-width: 200px;
        margin: 5px;
        padding: 3px 8px;
        border-radius: 5px;
        font-size: 0.9rem;
        background: $theme-pale;

        .icon {
          margin-right: 5px;
        }

        .common {
          margin-left: 5px;
        }

        .fa-times {
          margin-left: 10px;
        }
      }

      .multiselect-search {
        flex-grow: 1;
        min-width: 40px;
        min-height: $height;

        input {
          width: 100% !important;
          min-height: $height;
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
    width: 100%;
    max-width: 100%;
    border: solid $light-gray 2px;
    border-top: none;
    border-radius: 0 0 5px 5px;
    max-height: 200px !important;
    overflow-y: auto;
    z-index: 100;
    background: $white;

    .multiselect-option {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      min-height: $height;
      padding: 0 10px;
      color: $black;
      font-size: 1rem;
      text-decoration: none;
      text-align: left;

      .icon {
        margin-right: 10px;
      }

      .common {
        margin-left: 10px;
      }

      &.is-pointed {
        background: $theme-pale;
      }
    }

    .multiselect-no-results,
    .multiselect-no-options {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: $height;
    }
  }
}
</style>
