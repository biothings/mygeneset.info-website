<template>
  <AppSection>
    <AppHeading level="2" icon="hammer">Build</AppHeading>

    <AppButton
      to="/new"
      icon="wand-magic-sparkles"
      text="New Geneset"
      fill="filled"
      size="big"
    />

    <template v-if="loggedIn">
      <AppHeading level="3">Your Genesets</AppHeading>

      <AppStatus v-if="loading" status="loading"
        >Loading personal genesets</AppStatus
      >

      <AppGenesetTable
        v-else-if="userGenesets.length"
        v-model:start="start"
        v-model:sort="sort"
        :genesets="userGenesets"
        :per-page="perPage"
        :total="total"
      />

      <div v-else>
        Your personal genesets will appear here once you create one
      </div>
    </template>
    <div v-else>Log in to view your personal genesets</div>
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { searchGenesets, Geneset } from "@/api/genesets";
import { Sort } from "@/components/AppTable.vue";
import AppGenesetTable from "@/components/AppGenesetTable.vue";
import AppStatus from "@/components/AppStatus.vue";
import { useStore } from "@/store";
import { isStale } from "@/api";

const store = useStore();

// results
const userGenesets = ref<Array<Geneset>>([]);

// pagination state
const start = ref(0);
const perPage = ref(10);
const total = ref(0);

// sort state
const sort = ref<Sort>();

// loading state
const loading = ref(false);

const search = async () => {
  // don't bother if not logged in
  if (!loggedIn.value) return;

  // status
  loading.value = true;

  try {
    // get list of genesets with author matching logged in username
    const response = await searchGenesets(
      "getUserGenesets",
      `author:${loggedIn.value.username}`,
      undefined,
      sort.value,
      start.value,
      perPage.value
    );

    userGenesets.value = response.genesets;
    total.value = response.total;
  } catch (error) {
    console.error(error);

    if (isStale(error)) return;

    userGenesets.value = [];
    total.value = 0;
  }

  // status
  loading.value = false;
};

// get logged in state
const loggedIn = computed(() => store.state.loggedIn);

// run search on state change
watch([loggedIn, start, perPage, sort], search);

// run search on load
onMounted(search);
</script>
