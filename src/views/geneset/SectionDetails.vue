<template>
  <AppSection>
    <AppHeading level="3" icon="address-card" link="details"
      >Details</AppHeading
    >

    <div class="details">
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

      <AppDetail :heading="geneset.source ? 'Source' : 'Author'">
        <template v-if="geneset.author">{{ geneset.author }}</template>
        <AppLink
          v-else-if="geneset.source"
          :to="$store.state.metadata?.curatedMeta[geneset.source].url"
        >
          {{ geneset.source }}
        </AppLink>
      </AppDetail>

      <AppDetail :heading="geneset.updated ? 'Updated' : 'Created'">
        {{
          geneset.updated?.toLocaleString() || geneset.created?.toLocaleString()
        }}
      </AppDetail>

      <AppDetail heading="Visibility">
        <AppCheckbox
          v-if="editable"
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
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import AppDetail from "@/components/AppDetail.vue";
import AppInput from "@/components/AppInput.vue";
import AppCheckbox from "@/components/AppCheckbox.vue";
import { Geneset } from "@/api/genesets";

interface Props {
  // current geneset
  geneset: Geneset;
  // whether geneset is editable
  editable: boolean;
}

defineProps<Props>();

interface Emits {
  // update field in the current geneset
  (event: "update-field", field: keyof Geneset, value: unknown): void;
}

defineEmits<Emits>();
</script>

<style scoped lang="scss">
$breakpoint: 500px;

.details {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: start;
  gap: 40px;
  width: 100%;
}

.full {
  grid-column: 1 / span 3;
}

@media (max-width: $breakpoint) {
  .details {
    grid-template-columns: 1fr;
  }

  .full {
    grid-column: 1 / span 1;
  }
}
</style>
