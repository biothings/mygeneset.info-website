<!--
  page to create, edit, or view geneset
-->

<template>
  <!-- status -->
  <AppSection v-if="loading || problem">
    <AppStatus v-if="loading" status="loading"
      >Loading geneset information</AppStatus
    >

    <AppStatus v-if="problem" status="error">Error loading geneset</AppStatus>
  </AppSection>

  <template v-else>
    <SectionOverview :geneset="geneset" :editable="editable" :fresh="fresh" />
    <SectionDetails
      :geneset="geneset"
      :editable="editable"
      :fresh="fresh"
      @update-field="updateField"
    />
    <SectionSelected
      :genes="geneset.genes"
      :editable="editable"
      :remove-genes="removeGenes"
      :species="species"
    />
    <SectionAdd
      v-if="editable"
      :genes="geneset.genes"
      :gene-in-set="geneInSet"
      :add-genes="addGenes"
      :remove-genes="removeGenes"
    />
    <SectionDownload :geneset="geneset" :species="species" />
    <SectionFinish
      v-if="editable"
      :geneset="geneset"
      :original="original"
      :fresh="fresh"
      :update-geneset="updateGeneset"
      :delete-geneset="deleteGeneset"
      :in-progress="inProgress"
    />
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
import AppStatus from "@/components/AppStatus.vue";
import SectionDetails from "@/views/geneset/SectionDetails.vue";
import SectionSelected from "@/views/geneset/SectionSelected.vue";
import SectionAdd from "@/views/geneset/SectionAdd.vue";
import SectionDownload from "@/views/geneset/SectionDownload.vue";
import SectionFinish from "@/views/geneset/SectionFinish.vue";
import { isStale } from "@/api";
import {
  Geneset,
  lookupGeneset,
  updateGeneset as updateGenesetApi,
  deleteGeneset as deleteGenesetApi,
} from "@/api/genesets";
import { Gene } from "@/api/genes";
import { cloneDeep, map, uniq } from "lodash";
import { sleep } from "@/util/debug";
import SectionOverview from "./geneset/SectionOverview.vue";
import { searchSpecies, Species } from "@/api/species";

const router = useRouter();
const route = useRoute();
const store = useStore();

// loading state
const loading = ref(false);

// error state (can't name "error" because it confuses parser)
const problem = ref(false);

// blank geneset
const makeBlank = (): Geneset =>
  cloneDeep({
    id: "",
    name: "",
    author: store.state.loggedIn?.username || "",
    created: new Date(),
    updated: new Date(),
    description: "",
    isPublic: true,
    genes: [],
    count: 0,
  });

// current state of geneset (changes when editing)
const geneset = ref<Geneset>(makeBlank());

// original state of geneset when loaded, for purposes of making diff
const original = ref<Geneset>(makeBlank());

// whether geneset is editable by logged in user
const editable = ref(false);

// whether is new geneset (can't use "new" because it's a js keyword)
const fresh = ref(false);

// whether a critical action (creating/updating/deleting geneset) is in progress
const inProgress = ref(false);

// unique species in selected genes
const species = ref<Array<Species>>([]);

// load geneset from id in url, or blank if on /new
const load = async () => {
  // existing geneset (id in url)
  if (route.params.id) {
    loading.value = true;

    try {
      const response = await lookupGeneset(route.params.id as string);

      geneset.value = cloneDeep(response);
      original.value = cloneDeep(response);

      fresh.value = false;
      editable.value = response.author === store.state.loggedIn?.username;
    } catch (error) {
      if (isStale(error)) {
        console.info("Stale query");
        return;
      }

      console.error(error);

      problem.value = true;
      editable.value = false;
    }

    loading.value = false;
  }

  // new geneset
  else {
    geneset.value = makeBlank();
    original.value = makeBlank();

    fresh.value = true;
    editable.value = true;
  }
};

// check if gene in set
const geneInSet = (gene: Gene) =>
  geneset.value.genes.findIndex((g) => g.id === gene.id) !== -1;

// add gene to set
const addGenes = (...genes: Array<Gene>) => {
  const newGenes = genes.filter((gene) => !geneInSet(gene));
  geneset.value.genes.push(...newGenes);
};

// remove gene from set
const removeGenes = (...genes: Array<Gene>) => {
  const ids = genes.map((gene) => gene.id);
  geneset.value.genes = geneset.value.genes.filter(
    (gene) => !ids.includes(gene.id)
  );
};

// update field in geneset
const updateField = (field: keyof Geneset, value: unknown) => {
  if (field === "name") geneset.value.name = value as string;
  if (field === "description") geneset.value.description = value as string;
  if (field === "isPublic") geneset.value.isPublic = value as boolean;
};

// create or update geneset
const updateGeneset = async () => {
  const {
    id = "",
    name = "",
    description = "",
    isPublic = false,
    genes = [],
  } = geneset.value;

  if (!name.trim()) {
    window.alert("Please enter a name for this geneset!");
    return;
  }

  if (fresh.value) {
    if (!window.confirm("Are you sure you want to create this geneset?"))
      return;
  } else {
    if (!window.confirm("Are you sure you want to update this geneset?"))
      return;
  }

  inProgress.value = true;

  try {
    const response = await updateGenesetApi(
      fresh.value,
      id,
      name,
      description,
      isPublic,
      genes.map((gene) => gene.id)
    );

    // wait for database to refresh
    await sleep(1000);
    // go to geneset's page (new or refresh)
    if (response._id) router.push("/geneset/" + response._id);
    else router.push("/build");
  } catch (error) {
    window.alert("Error saving geneset");
    console.error(error);
  } finally {
    inProgress.value = false;
  }
};

// delete geneset
const deleteGeneset = async () => {
  if (
    !window.confirm(
      "Are you sure you want to delete this geneset? This cannot be undone."
    )
  )
    return;

  inProgress.value = true;

  try {
    await deleteGenesetApi(geneset.value.id);

    // wait for database to refresh
    await sleep(1000);
    // go back to build page
    router.push("/build");
  } catch (error) {
    window.alert("Error deleting geneset");
    console.error(error);
  } finally {
    inProgress.value = false;
  }
};

// when selected genes change
watch(
  () => geneset.value.genes,
  async () => {
    try {
      const ids = uniq(map(geneset.value.genes, "taxid"));
      species.value = (await searchSpecies(ids)).species;
    } catch (error) {
      console.error(error);
    }
  },
  { deep: true, immediate: true }
);

watch([() => route.params.id, () => store.state.loggedIn?.username], load);
onMounted(load);
</script>
