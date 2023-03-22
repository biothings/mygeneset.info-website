<template>
  <AppSection>
    <AppHeading level="3" icon="address-card" link="details"
      >Details</AppHeading
    >

    <div class="details">
      <!-- name -->
      <AppDetail heading="Name" class="full">
        <AppInput
          v-if="editable"
          placeholder="Descriptive name of the geneset"
          :model-value="geneset.name"
          @update:model-value="(value) => $emit('update-field', 'name', value)"
        />
        <template v-else>
          {{ geneset.name }}
        </template>
      </AppDetail>

      <!-- description -->
      <AppDetail heading="Description" class="full">
        <AppInput
          v-if="editable"
          placeholder="Detailed description of the geneset"
          mode="multi"
          :model-value="geneset.description"
          @update:model-value="
            (value) => $emit('update-field', 'description', value)
          "
        />
        <template v-else>
          {{ geneset.description }}
        </template>
      </AppDetail>

      <!-- author/source -->
      <AppDetail v-if="geneset.author" heading="Author">
        {{ geneset.author }}
      </AppDetail>
      <AppDetail v-else-if="geneset.source" heading="Source">
        <AppLink :to="curatedMeta?.url || ''">
          {{ geneset.source }}
        </AppLink>
      </AppDetail>

      <!-- category -->
      <AppDetail v-if="geneset.category" heading="Category">
        {{ geneset.category }}
      </AppDetail>

      <!-- visibility -->
      <AppDetail heading="Visibility">
        <AppCheckbox
          v-if="editable && geneset.author"
          text="Public"
          :model-value="geneset.isPublic"
          @update:model-value="
            (value) => $emit('update-field', 'isPublic', value)
          "
        />
        <template v-else>
          {{ geneset.isPublic ? "Public" : "Private" }}
        </template>
      </AppDetail>

      <!-- dates -->
      <AppDetail v-if="geneset.created" heading="Created">
        <AppAgo :date="geneset.created" />
      </AppDetail>
      <AppDetail v-if="geneset.updated" heading="Updated">
        <AppAgo :date="geneset.updated" />
      </AppDetail>
      <AppDetail
        v-if="curatedMeta?.downloaded"
        tooltip="'Date when geneset were downloaded from its upstream source'"
        heading="Downloaded"
      >
        <AppAgo :date="curatedMeta.downloaded" />
      </AppDetail>
      <AppDetail
        v-if="curatedMeta?.uploaded"
        tooltip="
          'Date when geneset was parsed, processed, etc. and uploaded to the database'
        "
        heading="Uploaded"
      >
        <AppAgo :date="curatedMeta.uploaded" />
      </AppDetail>
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AppDetail from "@/components/AppDetail.vue";
import AppInput from "@/components/AppInput.vue";
import AppCheckbox from "@/components/AppCheckbox.vue";
import { Geneset } from "@/api/genesets";
import { useStore } from "@/store";
import { Metadata } from "@/api/metadata";
import AppAgo from "@/components/AppAgo.vue";

const store = useStore();

interface Props {
  // current geneset
  geneset: Geneset;
  // whether geneset is editable
  editable: boolean;
  // whether geneset is new
  fresh: boolean;
}

const props = defineProps<Props>();

interface Emits {
  // update field in the current geneset
  (event: "update-field", field: keyof Geneset, value: unknown): void;
}

defineEmits<Emits>();

// if geneset is curated, metadata from global metadata
type CuratedMeta = Metadata["curatedMeta"][string];
const curatedMeta = computed<CuratedMeta | null>(
  () => store.state.metadata?.curatedMeta[props.geneset.source || ""] || null
);
</script>

<style scoped lang="scss">
$tablet: 900px;
$phone: 500px;

.details {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: start;
  gap: 40px;
  width: 100%;
}

.full {
  grid-column: 1 / span 4;
}

@media (max-width: $tablet) {
  .details {
    grid-template-columns: 1fr 1fr;
  }

  .full {
    grid-column: 1 / span 2;
  }
}

@media (max-width: $phone) {
  .details {
    grid-template-columns: 1fr;
  }

  .full {
    grid-column: 1 / span 1;
  }
}
</style>
