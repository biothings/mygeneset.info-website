<template>
  <!-- finish section -->
  <Section>
    <Center :vertical="true" width="200px">
      <Clickable
        text="Duplicate"
        icon="fas fa-copy"
        design="big"
        v-tooltip="'Start new geneset from this one'"
      />
      <Clickable text="Publish Changes" icon="fas fa-upload" design="big" />
      <div class="diff">
        <div v-if="edited" class="edited">
          <span>Edited </span><span>{{ edited }}</span>
        </div>
        <div v-if="added" class="added">
          <span>Added </span><span>{{ added }}</span>
        </div>
        <div v-if="removed" class="removed">
          <span>Removed </span><span>{{ added }}</span>
        </div>
      </div>
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import { Geneset } from "@/api/types";
import { toHumanCase } from "@/util/string";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable
  },
  props: {
    // current geneset
    geneset: {},
    // original unmodified genset
    original: {}
  },
  data() {
    return {
      // "edited" fields diff
      edited: "",
      // added genes diff
      added: "",
      // removed genes diff
      removed: ""
    };
  },
  watch: {
    geneset: {
      handler() {
        const geneset = (this.geneset || {}) as Geneset;
        const original = (this.original || {}) as Geneset;

        console.log(geneset, original);

        // find changed fields
        const edited = [];
        const fields = ["_id", "creator", "date", "description", "is_public"];
        for (const field of fields) {
          const key = field as keyof Geneset;
          if (geneset[key] !== original[key]) edited.push(toHumanCase(key));
        }
        this.edited = edited.join(", ");

        // find removed genes
      },
      deep: true
    }
  }
});
</script>

<style scope lang="scss">
.diff {
  .edited > span:first-child {
    color: $blue;
  }
  .added > span:first-child {
    color: $green;
  }
  .removed > span:first-child {
    color: $red;
  }
  & > div > span:last-child {
    color: $dark-gray;
  }
}
</style>
