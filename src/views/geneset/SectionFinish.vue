<template>
  <AppSection>
    <AppHeading level="3" icon="circle-check" link="finish">Finish</AppHeading>

    <!-- diff -->
    <AppFlex direction="col" gap="small">
      <div v-if="edited" class="edited">
        <span>Edited </span><span>{{ edited }}</span>
      </div>
      <div v-if="added" class="added">
        <span>Added </span><span>{{ added }} gene(s)</span>
      </div>
      <div v-if="removed" class="removed">
        <span>Removed </span><span>{{ removed }} gene(s)</span>
      </div>
    </AppFlex>

    <!-- actions -->
    <AppFlex>
      <AppButton
        :icon="fresh ? 'wand-magic-sparkles' : 'upload'"
        :text="fresh ? 'Create Geneset' : 'Publish Changes'"
        fill="filled"
        size="big"
        @click="updateGeneset"
      />
      <AppButton
        v-if="!fresh"
        icon="trash-can"
        text="Delete Geneset"
        color="important"
        fill="filled"
        size="big"
        @click="deleteGeneset"
      />
    </AppFlex>
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { reject, startCase } from "lodash";
import { Geneset } from "@/api/genesets";
import { Gene } from "@/api/genes";

interface Props {
  // current geneset
  geneset: Geneset;
  // original unmodified genset
  original: Geneset;
  // whether geneset is new
  fresh: boolean;
  // geneset manipulation functions from parent
  updateGeneset: () => void;
  deleteGeneset: () => void;
}

const props = defineProps<Props>();

// diff values
const edited = ref("");
const added = ref(0);
const removed = ref(0);

const computeDiff = () => {
  // top-level fields
  const keys: Array<keyof Geneset> = [
    "id",
    "name",
    "author",
    "updated",
    "description",
    "isPublic",
  ];

  // "edited" fields diff
  edited.value = keys
    .filter((key) => props.geneset[key] !== props.original[key])
    .map((key) => `"${startCase(key)}"`)
    .join(", ");

  // get list of before and after gene ids
  const map = (gene: Gene) => gene.id;
  const before = props.original.genes.map(map);
  const after = props.geneset.genes.map(map);

  // find added genes (ones in after and not in before)
  added.value = reject(after, (a) => before.includes(a)).length;

  // find removed genes (ones in before and not in after)
  removed.value = reject(before, (b) => after.includes(b)).length;
};

watch(() => props.geneset, computeDiff, { deep: true });
onMounted(computeDiff);
</script>

<style scope lang="scss">
.edited > span:first-child {
  color: $blue;
}

.added > span:first-child {
  color: $green;
}

.removed > span:first-child {
  color: $red;
}
</style>
