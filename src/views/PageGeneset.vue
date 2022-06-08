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
      @update-field="updateField"
    />
    <SectionSelected
      :genes="geneset.genes"
      :editable="editable"
      :remove-gene="removeGene"
    />
    <SectionAdd
      v-if="editable"
      :genes="geneset.genes"
      :gene-in-set="geneInSet"
      :add-gene="addGene"
      :remove-gene="removeGene"
    />
    <SectionDownload :geneset="geneset" />
    <SectionFinish
      v-if="editable"
      :geneset="geneset"
      :original="original"
      :fresh="fresh"
      :update-geneset="updateGeneset"
      :delete-geneset="deleteGeneset"
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
import { cloneDeep } from "lodash";
import { sleep } from "@/util/debug";
import SectionOverview from "./geneset/SectionOverview.vue";

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
  });

// current state of geneset (changes when editing)
const geneset = ref<Geneset>(makeBlank());

// original state of geneset when loaded, for purposes of making diff
const original = ref<Geneset>(makeBlank());

// whether geneset is editable by logged in user
const editable = ref(false);

// whether is new geneset (can't use "new" because it's a js keyword)
const fresh = ref(false);

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
      console.error(error);

      if (isStale(error)) return;

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
const addGene = (gene: Gene) => geneset.value.genes.push(gene);

// remove gene from set
const removeGene = (gene: Gene) => {
  const index = geneset.value.genes.findIndex((g) => g.id === gene.id);
  if (index !== -1) geneset.value.genes.splice(index, 1);
};

// update field in geneset
const updateField = (field: keyof Geneset, value: unknown) => {
  if (field === "name") geneset.value.name = value as string;
  if (field === "description") geneset.value.description = value as string;
  if (field === "isPublic") geneset.value.isPublic = value as boolean;
};

// update geneset
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

  const success = await updateGenesetApi(
    fresh.value,
    id,
    name,
    description,
    isPublic,
    genes.map((gene) => gene.id)
  );

  // wait for database to refresh
  await sleep(1000);
  // go back to build page
  if (success) router.push("/build");
};

// delete geneset
const deleteGeneset = async () => {
  if (
    !window.confirm(
      "Are you sure you want to delete this geneset? This cannot be undone."
    )
  )
    return;

  const success = await deleteGenesetApi(geneset.value.id);

  // wait for database to refresh
  await sleep(1000);
  // go back to build page
  if (success) router.push("/build");
};

watch([() => route.params.id, () => store.state.loggedIn?.username], load);
onMounted(load);
</script>
