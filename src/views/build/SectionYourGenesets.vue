<template>
  <AppSection>
    <!-- logged in -->
    <template v-if="loggedIn">
      <AppHeading level="3" icon="user" link="your-genesets"
        >Your Genesets</AppHeading
      >

      <!-- search -->
      <AppFlex direction="col">
        <!-- boxes -->
        <AppInput
          v-model="keywords"
          placeholder="Filter your genesets by keyword"
          icon="search"
          @change="search"
        />

        <AppSpeciesSelect
          v-model="species"
          placeholder="Filter your genesets by species"
          @deselect="search"
          @select="search"
        />
      </AppFlex>

      <!-- results -->
      <AppGenesetTable
        v-model:start="start"
        v-model:sort="sort"
        :genesets="yourGenesets"
        :per-page="perPage"
        :total="total"
      >
        <AppStatus v-if="loading" status="loading"
          >Loading personal genesets</AppStatus
        >
        <AppStatus v-else-if="!yourGenesets.length" status="warning"
          >Your personal genesets will appear here once you create
          one</AppStatus
        >
      </AppGenesetTable>
    </template>

    <!-- not logged in -->
    <AppStatus v-else status="warning"
      >Log in to view your personal genesets</AppStatus
    >
  </AppSection>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { searchGenesets, Geneset } from "@/api/genesets";
import { Sort } from "@/components/AppTable.vue";
import AppInput from "@/components/AppInput.vue";
import AppSpeciesSelect from "@/components/AppSpeciesSelect.vue";
import AppGenesetTable from "@/components/AppGenesetTable.vue";
import AppStatus from "@/components/AppStatus.vue";
import { useStore } from "@/store";
import { isStale } from "@/api";

const store = useStore();

// searched keywords
const keywords = ref("");

// selected species
const species = ref<Array<string>>([]);

// logged in user genesets
const yourGenesets = ref<Array<Geneset>>([]);

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
      `${keywords.value} author:${loggedIn.value.username}`,
      species.value,
      sort.value,
      start.value,
      perPage.value
    );

    yourGenesets.value = response.genesets;
    total.value = response.total;
  } catch (error) {
    console.error(error);

    if (isStale(error)) return;

    yourGenesets.value = [];
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
