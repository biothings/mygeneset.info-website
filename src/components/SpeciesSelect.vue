<template>
  <!-- species multi-select search box -->
  <Multiselect
    v-model="value"
    :options="search"
    mode="tags"
    :searchable="true"
    trackBy="full"
    valueProp="key"
    :caret="false"
    :limit="100"
    :delay="300"
    noOptionsText="No results"
    noResultsText="No results"
    @open="refresh"
    ref="multiselect"
  >
    <!-- selected species -->
    <template v-slot:tag="{ option, handleTagRemove, disabled }">
      <button
        class="multiselect-tag is-user"
        @click.prevent
        @mousedown.prevent.stop="handleTagRemove(option, $event)"
        :disabled="disabled"
        v-tooltip.slow="option.full"
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

    <!-- species results/options -->
    <template v-slot:option="{ option }">
      <img v-if="option.icon" :src="option.icon" class="icon" />
      <span
        v-if="option.scientific || option.common"
        class="name"
        v-tooltip.slow="option.full"
      >
        <span v-if="option.scientific" class="scientific">{{
          option.scientific
        }}</span>
        <span v-if="option.common" class="common">{{ option.common }}</span>
      </span>
    </template>

    <!-- results count -->
    <template v-slot:afterlist>
      <div class="count">
        <i class="fas fa-seedling"></i>
        <span>Top {{ top }} of {{ total }} total results</span>
      </div>
    </template>
  </Multiselect>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Multiselect from "@vueform/multiselect";
import { search } from "@/api/species";
import { popular as getPopular } from "@/api/species";
import { Species } from "@/api/types";

// type shim for multiselect library
interface MultiselectType {
  refreshOptions: Function;
}

// https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
// have webpack load all svg icons in species assets folder...
const context = require.context("@/assets/species", false, /\.svg$/);
const icons = context.keys().map(context) as string[];
// ...and provide func to access them
const findIcon = (name: string) => {
  const pattern = new RegExp(`${name}\\.[A-Za-z0-9]*\\.svg`);
  return icons.find((icon: string) => icon.match(pattern));
};

// popular species (ones included in most genesets)
let popular: Species[] = [];
const setPopular = async () => (popular = await getPopular());
setPopular();

export default defineComponent({
  components: {
    Multiselect
  },
  data() {
    return {
      // current selected species
      value: null,
      // top X of...
      top: "",
      // ...N total results
      total: ""
    };
  },
  methods: {
    async search(query: string) {
      // get results
      let results;
      // use popular if nothing typed in. otherwise, search based on what's typed.
      if (query) results = await search(query);
      else results = popular || [];

      // get result counts
      this.top = Math.min(100, results.length).toLocaleString();
      this.total = (results[0]?.total || 0).toLocaleString();

      // compute and rename props
      const formatResult = (result: Species) => {
        const key: string = result._id || "";
        const scientific: string = result.scientific_name || "";
        const common: string = [
          ...(result.genbank_common_name || []),
          ...(result.common_name || []),
          ...(result.other_names || [])
        ]
          .filter(name => name)
          .join(", ");
        const full = [key, scientific, common].join(" - ");
        const icon = findIcon(scientific);
        return { key, scientific, common, full, icon };
      };

      results = results.map(formatResult);

      return results;
    },
    // refresh option list
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

.count {
  display: flex;
  justify-content: center;
  align-items: center;
  height: $height;
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
