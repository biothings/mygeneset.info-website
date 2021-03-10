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
          <span>Added </span><span>{{ added }} gene(s)</span>
        </div>
        <div v-if="removed" class="removed">
          <span>Removed </span><span>{{ removed }} gene(s)</span>
        </div>
      </div>
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import { Geneset } from "@/api/types";
import { Gene } from "@/api/types";
import { toHumanCase } from "@/util/string";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable
  },
  props: {
    // current geneset
    geneset: Object as PropType<Geneset>,
    // original unmodified genset
    original: Object as PropType<Geneset>
  },
  data() {
    return {
      // "edited" fields diff
      edited: "",
      // added genes diff
      added: 0,
      // removed genes diff
      removed: 0
    };
  },
  watch: {
    geneset: {
      handler() {
        const geneset = (this.geneset || {}) as Geneset;
        const original = (this.original || {}) as Geneset;

        // find changed fields
        const edited = [];
        const fields = ["_id", "creator", "date", "description", "is_public"];
        for (const field of fields) {
          const key = field as keyof Geneset;
          if (geneset[key] !== original[key]) edited.push(toHumanCase(key));
        }
        this.edited = edited.join(", ");

        // get list of before and after gene ids
        const map = (gene: Gene) => gene.mygene_id || "";
        const before = (original.genes || []).map(map);
        const after = (geneset.genes || []).map(map);

        // find added genes (ones in after and not in before)
        this.added = after.filter(
          (a: string) => before.findIndex((b: string) => a === b) === -1
        ).length;

        // find removed genes (ones in before and not in after)
        this.removed = before.filter(
          (b: string) => after.findIndex((a: string) => a === b) === -1
        ).length;
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
